/**
 * WACAT Shopify Theme - JavaScript
 * All animations and interactions using Anime.js
 */

(function() {
  'use strict';

  // Wait for DOM and Anime.js to be loaded
  document.addEventListener('DOMContentLoaded', function() {
    if (typeof anime === 'undefined') {
      console.error('Anime.js is not loaded');
      return;
    }

    // ==========================================================================
    // HERO ANIMATIONS
    // ==========================================================================

    // 1. Badge inicial - Entrada explosiva desde arriba
    anime({
      targets: '.hero-badge-initial',
      opacity: [0, 1],
      translateY: [-100, 0],
      scale: [0.5, 1.1, 1],
      rotate: ['-10deg', '5deg', '0deg'],
      duration: 1600,
      delay: 0,
      easing: 'spring(1, 80, 10, 0)',
    });

    // 2. Animación continua de latido en el icono del corazón del badge
    anime({
      targets: '.hero-badge-initial .la-heart',
      scale: [1, 1.2, 1],
      duration: 1000,
      loop: true,
      delay: 2000,
      easing: 'easeInOutSine',
    });

    // 3. Hero Title - Animación espectacular con efecto de "revelar" letra por letra
    var heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      // Wrap each character in a span
      var text = heroTitle.textContent;
      heroTitle.innerHTML = text.replace(/\S/g, "<span class='letter'>$&</span>");

      anime({
        targets: '.hero-title .letter',
        opacity: [0, 1],
        translateY: [80, 0],
        translateZ: 0,
        rotateX: [-90, 0],
        scale: [0.3, 1],
        duration: 1400,
        delay: function(el, i) { return 400 + (i * 40); },
        easing: 'spring(1, 80, 10, 0)',
      });
    }

    // 4. Hero Subtitle - Efecto de "deslizar desde abajo" con blur
    anime({
      targets: '.hero-subtitle',
      opacity: [0, 1],
      translateY: [100, 0],
      filter: ['blur(20px)', 'blur(0px)'],
      duration: 2000,
      delay: 800,
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    });

    // 5. Hero Image - Entrada dramática con rotación y zoom
    anime({
      targets: '.hero-image',
      opacity: [0, 1],
      scale: [0.6, 1],
      rotate: ['-8deg', '0deg'],
      duration: 2200,
      delay: 400,
      easing: 'spring(1, 80, 10, 0)',
    });

    // 6. Imagen interna - Efecto Ken Burns desde el inicio
    anime({
      targets: '.hero-image img',
      scale: [1.3, 1],
      rotate: ['3deg', '0deg'],
      duration: 2500,
      delay: 400,
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    });

    // 7. Badge flotante - Aparición con rebote elástico
    anime({
      targets: '.hero-badge-float',
      opacity: [0, 1],
      scale: [0, 1],
      rotate: ['-180deg', '0deg'],
      duration: 1800,
      delay: function(el, i) { return 1400 + (i * 200); },
      easing: 'spring(1, 80, 10, 0)',
    });

    // 8. Animación continua de flotación en badges
    anime({
      targets: '.hero-badge-float',
      translateY: [0, -10, 0],
      rotate: [0, 2, 0, -2, 0],
      duration: 3000,
      loop: true,
      delay: function(el, i) { return 3000 + (i * 500); },
      easing: 'easeInOutSine',
    });

    // 9. Checkpoints - Efecto de "tarjetas cayendo" con perspectiva
    anime({
      targets: '.hero-checkpoint',
      opacity: [0, 1],
      translateY: [-60, 0],
      rotateX: [90, 0],
      scale: [0.8, 1],
      duration: 1200,
      delay: function(el, i) { return 1200 + (i * 150); },
      easing: 'spring(1, 80, 10, 0)',
    });

    // 10. CTA - Entrada explosiva con pulso
    anime({
      targets: '.hero-cta',
      opacity: [0, 1],
      scale: [0.5, 1.05, 1],
      translateY: [40, 0],
      duration: 1600,
      delay: 1800,
      easing: 'spring(1, 80, 10, 0)',
    });

    // 11. CTA Subtitle - Fade in suave
    anime({
      targets: '.hero-cta-subtitle',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 1200,
      delay: 2200,
      easing: 'cubicBezier(0.16, 1, 0.3, 1)',
    });

    // 12. Animación continua de "respiración" en el CTA
    anime({
      targets: '.hero-cta',
      scale: [1, 1.02, 1],
      duration: 2000,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutSine',
      delay: 3000,
    });

    // 13. Efecto shimmer en el CTA cada 5 segundos
    function createShimmer() {
      var ctaButton = document.querySelector('.hero-cta');
      if (ctaButton) {
        var shimmer = document.createElement('div');
        shimmer.className = 'absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full';
        shimmer.style.transform = 'translateX(-100%)';
        shimmer.style.pointerEvents = 'none';
        ctaButton.style.position = 'relative';
        ctaButton.style.overflow = 'hidden';
        ctaButton.appendChild(shimmer);

        anime({
          targets: shimmer,
          translateX: ['-100%', '200%'],
          duration: 1200,
          easing: 'easeInOutQuad',
          complete: function() {
            shimmer.remove();
          }
        });
      }
    }

    // Ejecutar shimmer periódicamente
    setTimeout(function() {
      createShimmer();
      setInterval(createShimmer, 5000);
    }, 4000);

    // 14. Animación de las huellas decorativas
    anime({
      targets: '.paw-decoration',
      opacity: [0, 0.05, 0],
      scale: [0.8, 1.2, 0.8],
      rotate: [0, 15, 0, -15, 0],
      duration: 4000,
      loop: true,
      delay: function(el, i) { return i * 800; },
      easing: 'easeInOutQuad',
    });

    // 15. Hover en título - letras se elevan al pasar el mouse
    if (heroTitle) {
      heroTitle.addEventListener('mouseenter', function() {
        anime({
          targets: '.hero-title .letter',
          translateY: [0, -8, 0],
          duration: 600,
          delay: function(el, i) { return i * 30; },
          easing: 'easeOutElastic(1, .5)',
        });
      });
    }

    // 16. Interacción con la imagen del hero - seguimiento del mouse (3D parallax)
    var heroImageContainer = document.querySelector('.hero-image');
    if (heroImageContainer) {
      heroImageContainer.addEventListener('mousemove', function(e) {
        var rect = heroImageContainer.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = (y - centerY) / 20;
        var rotateY = (centerX - x) / 20;

        anime({
          targets: heroImageContainer,
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 300,
          easing: 'easeOutQuad',
        });
      });

      heroImageContainer.addEventListener('mouseleave', function() {
        anime({
          targets: heroImageContainer,
          rotateX: 0,
          rotateY: 0,
          duration: 600,
          easing: 'spring(1, 80, 10, 0)',
        });
      });
    }

    // 17. Parallax SUPER dramático para revelar el texto al hacer scroll
    function handleScroll() {
      var scrolled = window.scrollY;
      var heroImageEl = document.querySelector('.hero-image');
      var heroTitleEl = document.querySelector('.hero-title');
      var heroImageInner = document.querySelector('.hero-image img');

      if (heroImageEl && scrolled < 1500) {
        // Movimiento parallax MUY pronunciado - la imagen baja super rápido (3x velocidad)
        heroImageEl.style.transform = 'translateY(' + (scrolled * 3) + 'px)';
        heroImageEl.style.opacity = Math.max(0, 1 - scrolled * 0.002);
      }

      // Parallax interno - zoom dramático y movimiento contrario muy visible
      if (heroImageInner && scrolled < 1500) {
        heroImageInner.style.transform = 'scale(' + (1 + scrolled * 0.0008) + ') translateY(' + (-scrolled * 0.3) + 'px)';
      }

      // El título se mueve despacio para contrastar y quedarse visible
      if (heroTitleEl && scrolled < 1200) {
        heroTitleEl.style.transform = 'translateY(' + (scrolled * 0.02) + 'px)';
        heroTitleEl.style.opacity = Math.max(0, 1 - scrolled * 0.0004);
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ==========================================================================
    // STATISTICS COUNTER ANIMATIONS
    // ==========================================================================

    function animateCounters() {
      var counters = document.querySelectorAll('.stat-number');

      counters.forEach(function(counter) {
        var targetValue = parseInt(counter.getAttribute('data-target'));
        var unit = counter.getAttribute('data-unit') || '';

        if (targetValue) {
          var obj = { value: 0 };

          anime({
            targets: obj,
            value: targetValue,
            duration: 2000,
            easing: 'cubicBezier(0.16, 1, 0.3, 1)',
            update: function() {
              var currentValue = Math.round(obj.value);
              counter.textContent = currentValue + unit;
            }
          });
        }
      });

      // Animar números de pasos (01, 02, 03)
      var stepNumbers = document.querySelectorAll('.step-number');
      stepNumbers.forEach(function(step, index) {
        anime({
          targets: step,
          opacity: [0, 0.3],
          scale: [0.8, 1],
          duration: 1200,
          delay: index * 300,
          easing: 'cubicBezier(0.16, 1, 0.3, 1)',
        });
      });
    }

    // ==========================================================================
    // INTERSECTION OBSERVER - Trigger animations when elements enter viewport
    // ==========================================================================

    var observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // Trigger specific animations based on section
          if (entry.target.classList.contains('animated-section')) {
            anime({
              targets: entry.target,
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 800,
              easing: 'cubicBezier(0.16, 1, 0.3, 1)',
            });
          }

          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all animated sections
    document.querySelectorAll('.animated-section').forEach(function(section) {
      observer.observe(section);
    });

    // Observer for statistics section to trigger counters
    var statsObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    var statsSection = document.getElementById('estadisticas');
    if (statsSection) {
      statsObserver.observe(statsSection);
    }

    // ==========================================================================
    // SWIPER INITIALIZATION (Testimonials)
    // ==========================================================================

    if (typeof Swiper !== 'undefined') {
      var testimonialsSwiper = new Swiper('.testimonials-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        speed: 800,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
      });
    }

    // ==========================================================================
    // BUY BUTTON ANIMATIONS
    // ==========================================================================

    var buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(function(button) {
      button.addEventListener('click', function(e) {
        // Animación de pulso elegante
        anime({
          targets: button,
          scale: [1, 0.94, 1.02, 1],
          duration: 600,
          easing: 'cubicBezier(0.16, 1, 0.3, 1)',
        });

        // Animación de resplandor
        anime({
          targets: button,
          boxShadow: [
            '0 0 0 0 rgba(30, 69, 99, 0)',
            '0 0 0 8px rgba(30, 69, 99, 0.1)',
            '0 0 0 12px rgba(30, 69, 99, 0)'
          ],
          duration: 600,
          easing: 'easeOutExpo',
        });
      });
    });

    // ==========================================================================
    // HEADER SCROLL BEHAVIOR
    // ==========================================================================

    var header = document.querySelector('[data-header]');
    var lastScroll = 0;

    window.addEventListener('scroll', function() {
      var currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        header.style.backdropFilter = 'blur(20px) saturate(180%)';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        header.style.borderBottomColor = 'rgba(30, 69, 99, 0.1)';
      } else {
        header.style.backdropFilter = 'blur(20px) saturate(180%)';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        header.style.borderBottomColor = 'rgba(30, 69, 99, 0.1)';
      }

      lastScroll = currentScroll;
    }, { passive: true });

    // ==========================================================================
    // MOBILE MENU (if needed in the future)
    // ==========================================================================

    var mobileMenuButton = document.querySelector('[aria-label="Menu"]');
    if (mobileMenuButton) {
      mobileMenuButton.addEventListener('click', function() {
        // Add mobile menu functionality here if needed
        console.log('Mobile menu clicked');
      });
    }

    // ==========================================================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================================================

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        var href = this.getAttribute('href');

        // Skip if href is just "#"
        if (href === '#' || href === '#producto') {
          return;
        }

        e.preventDefault();

        var target = document.querySelector(href);
        if (target) {
          var headerHeight = header ? header.offsetHeight : 0;
          var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // ==========================================================================
    // CONSOLE LOG - Theme loaded
    // ==========================================================================

    console.log('🐱 WACAT Theme loaded successfully!');
    console.log('💧 Animations powered by Anime.js');

  }); // End DOMContentLoaded

})();
