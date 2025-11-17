/**
 * WACAT Shopify Theme - JavaScript
 * Optimized for Apple-like minimalist UX
 * Subtle, fast, and performant animations
 */

(function() {
  'use strict';

  // Performance optimization - use requestAnimationFrame
  const raf = window.requestAnimationFrame || function(cb) { setTimeout(cb, 16); };

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ==========================================================================
  // PAGE LOAD - Progressive enhancement
  // ==========================================================================

  // Add loaded class to body once DOM is ready
  document.documentElement.classList.add('js-enabled');

  // Wait for DOM to be loaded
  document.addEventListener('DOMContentLoaded', function() {

    // Mark DOM as loaded
    document.body.classList.add('dom-loaded');

    // ==========================================================================
    // IMAGE LOADING - Progressive fade-in
    // ==========================================================================

    function handleImageLoad(img) {
      img.classList.add('loaded');
    }

    // Handle all images - both lazy and eager loading
    const allImages = document.querySelectorAll('img');
    allImages.forEach(function(img) {
      if (img.complete) {
        // Image already loaded
        handleImageLoad(img);
      } else {
        // Wait for image to load
        img.addEventListener('load', function() {
          handleImageLoad(img);
        });
        // Handle load errors gracefully
        img.addEventListener('error', function() {
          img.classList.add('loaded'); // Still show the broken image placeholder
        });
      }
    });

    // ==========================================================================
    // INTERSECTION OBSERVER - Progressive reveal on scroll
    // ==========================================================================

    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          // Add visible class for CSS transition
          entry.target.classList.add('visible');

          // Unobserve after animation to improve performance
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all animated sections
    document.querySelectorAll('.animated-section').forEach(function(section) {
      observer.observe(section);
    });

    // ==========================================================================
    // HERO ANIMATIONS - Subtle, progressive reveal
    // ==========================================================================

    if (!prefersReducedMotion) {
      // Animate hero elements with stagger
      const heroTitle = document.querySelector('.hero-title');
      const heroSubtitle = document.querySelector('.hero-subtitle');
      const heroCta = document.querySelector('.hero-cta');
      const heroImage = document.querySelector('.hero-image');

      // Simple fade-in sequence
      setTimeout(function() {
        if (heroTitle) heroTitle.style.opacity = '1';
      }, 100);

      setTimeout(function() {
        if (heroSubtitle) heroSubtitle.style.opacity = '1';
      }, 200);

      setTimeout(function() {
        if (heroCta) heroCta.style.opacity = '1';
      }, 300);

      setTimeout(function() {
        if (heroImage) heroImage.style.opacity = '1';
      }, 150);
    } else {
      // Instant reveal if reduced motion is preferred
      const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-cta, .hero-image');
      heroElements.forEach(function(el) {
        if (el) el.style.opacity = '1';
      });
    }

    // ==========================================================================
    // STATISTICS COUNTER - Smooth number counting
    // ==========================================================================

    function animateCounter(element, target, unit) {
      const duration = 1200;
      const start = 0;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic for smooth deceleration
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeProgress);

        element.textContent = current + unit;

        if (progress < 1) {
          raf(update);
        } else {
          element.textContent = target + unit;
        }
      }

      raf(update);
    }

    // Observer for statistics section
    const statsObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('.stat-number');

          counters.forEach(function(counter) {
            const target = parseInt(counter.getAttribute('data-target'));
            const unit = counter.getAttribute('data-unit') || '';

            if (target && !prefersReducedMotion) {
              animateCounter(counter, target, unit);
            } else if (target) {
              counter.textContent = target + unit;
            }
          });

          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    const statsSection = document.getElementById('estadisticas');
    if (statsSection) {
      statsObserver.observe(statsSection);
    }

    // ==========================================================================
    // BUTTON INTERACTIONS - Subtle feedback
    // ==========================================================================

    // Add touch/click feedback to all buttons and links
    const interactiveElements = document.querySelectorAll('a, button, .buy-button');

    interactiveElements.forEach(function(element) {
      // Touch start - slight scale down
      element.addEventListener('touchstart', function() {
        if (!prefersReducedMotion) {
          this.style.transform = 'scale(0.97)';
        }
      }, { passive: true });

      // Touch end - return to normal
      element.addEventListener('touchend', function() {
        if (!prefersReducedMotion) {
          this.style.transform = '';
        }
      }, { passive: true });

      // Mouse interactions
      element.addEventListener('mousedown', function() {
        if (!prefersReducedMotion) {
          this.style.transform = 'scale(0.97)';
        }
      });

      element.addEventListener('mouseup', function() {
        if (!prefersReducedMotion) {
          this.style.transform = '';
        }
      });

      element.addEventListener('mouseleave', function() {
        if (!prefersReducedMotion) {
          this.style.transform = '';
        }
      });
    });

    // ==========================================================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================================================

    const header = document.querySelector('[data-header]');

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Skip if href is just "#" or product anchor
        if (href === '#' || href === '#producto') {
          return;
        }

        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // ==========================================================================
    // HEADER SCROLL BEHAVIOR - Minimal backdrop blur
    // ==========================================================================

    if (header) {
      let ticking = false;

      function updateHeader() {
        const scrolled = window.pageYOffset;

        if (scrolled > 20) {
          header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
          header.style.borderBottomColor = 'rgba(30, 69, 99, 0.1)';
        } else {
          header.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
          header.style.borderBottomColor = 'transparent';
        }

        ticking = false;
      }

      window.addEventListener('scroll', function() {
        if (!ticking) {
          raf(function() {
            updateHeader();
          });
          ticking = true;
        }
      }, { passive: true });
    }

    // ==========================================================================
    // SWIPER INITIALIZATION - Testimonials (if Swiper is loaded)
    // ==========================================================================

    if (typeof Swiper !== 'undefined') {
      const swiperEl = document.querySelector('.testimonials-swiper');
      if (swiperEl) {
        new Swiper('.testimonials-swiper', {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          autoplay: {
            delay: 6000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          speed: 600,
          effect: 'fade',
          fadeEffect: {
            crossFade: true
          },
        });
      }
    }

    // ==========================================================================
    // FAQ ACCORDION - Simple toggle
    // ==========================================================================

    const faqItems = document.querySelectorAll('[data-faq-question]');

    faqItems.forEach(function(question) {
      question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const isOpen = this.getAttribute('aria-expanded') === 'true';

        // Close all other FAQs
        faqItems.forEach(function(item) {
          if (item !== question) {
            item.setAttribute('aria-expanded', 'false');
            const otherAnswer = item.nextElementSibling;
            if (otherAnswer) {
              otherAnswer.style.maxHeight = '0';
              otherAnswer.style.opacity = '0';
            }
          }
        });

        // Toggle current FAQ
        if (isOpen) {
          this.setAttribute('aria-expanded', 'false');
          answer.style.maxHeight = '0';
          answer.style.opacity = '0';
        } else {
          this.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          answer.style.opacity = '1';
        }
      });
    });

    // ==========================================================================
    // IMAGE LAZY LOADING - Progressive enhancement
    // ==========================================================================

    if ('loading' in HTMLImageElement.prototype) {
      // Browser supports native lazy loading
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach(function(img) {
        img.src = img.dataset.src || img.src;
      });
    } else {
      // Fallback for older browsers
      const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(function(img) {
        imageObserver.observe(img);
      });
    }

    // ==========================================================================
    // SCROLL PROGRESS INDICATOR
    // ==========================================================================

    // Create scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-indicator';
    progressBar.style.transform = 'scaleX(0)';
    document.body.appendChild(progressBar);

    let progressTicking = false;

    function updateScrollProgress() {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) : 0;

      progressBar.style.transform = 'scaleX(' + scrolled + ')';
      progressTicking = false;
    }

    window.addEventListener('scroll', function() {
      if (!progressTicking) {
        raf(function() {
          updateScrollProgress();
        });
        progressTicking = true;
      }
    }, { passive: true });

    // ==========================================================================
    // PAGE VISIBILITY - Pause animations when tab is inactive
    // ==========================================================================

    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        // Page is hidden - could pause animations here if needed
        document.body.classList.add('page-hidden');
      } else {
        // Page is visible again
        document.body.classList.remove('page-hidden');
      }
    });

    // ==========================================================================
    // PERFORMANCE MONITORING
    // ==========================================================================

    // Log performance metrics in development
    if (window.location.hostname === 'localhost' || window.location.hostname.includes('myshopify')) {
      window.addEventListener('load', function() {
        if (window.performance && window.performance.timing) {
          const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
          console.log('🐱 WACAT Theme loaded in ' + loadTime + 'ms');
        }

        // Log Largest Contentful Paint (LCP) for performance monitoring
        if ('PerformanceObserver' in window) {
          try {
            const perfObserver = new PerformanceObserver(function(entryList) {
              const entries = entryList.getEntries();
              const lastEntry = entries[entries.length - 1];
              console.log('📊 LCP:', Math.round(lastEntry.renderTime || lastEntry.loadTime) + 'ms');
            });
            perfObserver.observe({ entryTypes: ['largest-contentful-paint'] });
          } catch (e) {
            // Observer not supported, skip
          }
        }
      });
    }

    // Log theme initialization
    console.log('🐱 WACAT Theme initialized');
    console.log('💧 Optimized for performance and accessibility');

  }); // End DOMContentLoaded

  // ==========================================================================
  // EARLY PAGE LOAD - Before DOM is ready
  // ==========================================================================

  // Fade in page on load (prevents flash of unstyled content)
  window.addEventListener('load', function() {
    document.body.classList.add('page-loaded');
  });

})();
