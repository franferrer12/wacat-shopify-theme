/**
 * WACAT Theme - Anime.js Animation System
 * Configurable animations for all sections
 */

(function() {
  'use strict';

  // Wait for anime.js and DOM to be ready
  function initAnimations() {
    if (typeof anime === 'undefined') {
      console.warn('Anime.js not loaded yet');
      return;
    }

    // Animation presets
    const animationPresets = {
      fadeIn: {
        opacity: [0, 1],
        easing: 'easeOutQuad'
      },
      fadeInUp: {
        opacity: [0, 1],
        translateY: [40, 0],
        easing: 'easeOutCubic'
      },
      fadeInDown: {
        opacity: [0, 1],
        translateY: [-40, 0],
        easing: 'easeOutCubic'
      },
      fadeInLeft: {
        opacity: [0, 1],
        translateX: [-40, 0],
        easing: 'easeOutCubic'
      },
      fadeInRight: {
        opacity: [0, 1],
        translateX: [40, 0],
        easing: 'easeOutCubic'
      },
      scaleIn: {
        opacity: [0, 1],
        scale: [0.8, 1],
        easing: 'easeOutBack'
      },
      zoomIn: {
        opacity: [0, 1],
        scale: [0.3, 1],
        easing: 'easeOutBack'
      },
      slideInUp: {
        translateY: [100, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo'
      },
      slideInDown: {
        translateY: [-100, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo'
      },
      slideInLeft: {
        translateX: [-100, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo'
      },
      slideInRight: {
        translateX: [100, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo'
      },
      rotateIn: {
        opacity: [0, 1],
        rotate: [-90, 0],
        easing: 'easeOutBack'
      },
      flipInX: {
        opacity: [0, 1],
        rotateX: [-90, 0],
        easing: 'easeOutBack'
      },
      flipInY: {
        opacity: [0, 1],
        rotateY: [-90, 0],
        easing: 'easeOutBack'
      },
      bounceIn: {
        opacity: [0, 1],
        scale: [0, 1],
        easing: 'spring(1, 80, 10, 0)'
      },
      elastic: {
        opacity: [0, 1],
        translateY: [40, 0],
        easing: 'spring(1, 100, 10, 0)'
      },
      none: {
        opacity: 1
      }
    };

    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target;
          const animationType = section.dataset.animationType || 'fadeInUp';
          const duration = parseInt(section.dataset.animationDuration) || 800;
          const delay = parseInt(section.dataset.animationDelay) || 0;
          const stagger = parseInt(section.dataset.animationStagger) || 0;

          // Get the animation preset
          const animationConfig = animationPresets[animationType] || animationPresets.fadeInUp;

          // Find animated children
          const children = section.querySelectorAll('[data-animate-child]');

          if (children.length > 0) {
            // Animate children with stagger
            anime({
              targets: children,
              ...animationConfig,
              duration: duration,
              delay: anime.stagger(stagger, {start: delay})
            });
          } else {
            // Animate the section itself
            anime({
              targets: section,
              ...animationConfig,
              duration: duration,
              delay: delay
            });
          }

          // Unobserve after animation
          if (!section.dataset.animationRepeat || section.dataset.animationRepeat === 'false') {
            observer.unobserve(section);
          }
        }
      });
    }, observerOptions);

    // Observe all sections with animations
    document.querySelectorAll('[data-animate]').forEach(section => {
      // Set initial state
      const animationType = section.dataset.animationType || 'fadeInUp';
      const animationConfig = animationPresets[animationType] || animationPresets.fadeInUp;

      // Apply initial opacity
      if (animationConfig.opacity && Array.isArray(animationConfig.opacity)) {
        section.style.opacity = '0';
      }

      observer.observe(section);
    });

    // Animate children separately
    document.querySelectorAll('[data-animate-children]').forEach(container => {
      const children = container.querySelectorAll('[data-animate-child]');

      children.forEach(child => {
        child.style.opacity = '0';
      });

      const childObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const animationType = container.dataset.animationType || 'fadeInUp';
            const duration = parseInt(container.dataset.animationDuration) || 600;
            const delay = parseInt(container.dataset.animationDelay) || 0;
            const stagger = parseInt(container.dataset.animationStagger) || 100;

            const animationConfig = animationPresets[animationType] || animationPresets.fadeInUp;

            anime({
              targets: children,
              ...animationConfig,
              duration: duration,
              delay: anime.stagger(stagger, {start: delay})
            });

            childObserver.unobserve(entry.target);
          }
        });
      }, observerOptions);

      childObserver.observe(container);
    });

    // Continuous animations (for elements that should always animate)
    document.querySelectorAll('[data-animate-continuous]').forEach(element => {
      const animationType = element.dataset.animationType || 'fadeIn';
      const duration = parseInt(element.dataset.animationDuration) || 2000;
      const direction = element.dataset.animationDirection || 'normal';

      anime({
        targets: element,
        ...animationPresets[animationType],
        duration: duration,
        loop: true,
        direction: direction,
        easing: 'easeInOutSine'
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }

  // Reinitialize on page change (for SPAs/AJAX)
  document.addEventListener('shopify:section:load', initAnimations);
})();
