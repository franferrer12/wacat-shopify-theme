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
    // HERO ANIMATIONS - DISABLED for visibility
    // ==========================================================================
    // Commented out to ensure hero elements are visible by default
    // Progressive enhancement: content should be visible without JavaScript

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

  // ==========================================================================
  // ULTRA UX ENHANCEMENTS - Advanced micro-interactions
  // ==========================================================================

  document.addEventListener('DOMContentLoaded', function() {

    // ========================================================================
    // BACK TO TOP BUTTON - Smooth scroll with magnetic effect
    // ========================================================================
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="las la-arrow-up"></i>';
    backToTop.setAttribute('aria-label', 'Volver arriba');
    backToTop.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
      background: var(--wacat-navy);
      color: white;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transform: scale(0.8);
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 4px 12px rgba(30, 69, 99, 0.15);
      z-index: 100;
    `;
    document.body.appendChild(backToTop);

    // Show/hide based on scroll position
    let backToTopTicking = false;
    window.addEventListener('scroll', function() {
      if (!backToTopTicking) {
        raf(function() {
          if (window.pageYOffset > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
            backToTop.style.transform = 'scale(1)';
          } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
            backToTop.style.transform = 'scale(0.8)';
          }
          backToTopTicking = false;
        });
        backToTopTicking = true;
      }
    }, { passive: true });

    // Smooth scroll to top
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Hover effect
    backToTop.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
      this.style.boxShadow = '0 8px 20px rgba(30, 69, 99, 0.25)';
    });

    backToTop.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = '0 4px 12px rgba(30, 69, 99, 0.15)';
    });

    // ========================================================================
    // MAGNETIC BUTTONS - Cursor attraction effect
    // ========================================================================
    if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
      const magneticButtons = document.querySelectorAll('.btn-primary, .btn-xl');

      magneticButtons.forEach(function(button) {
        button.addEventListener('mousemove', function(e) {
          const rect = this.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          // Limit movement to 10px
          const moveX = x * 0.2;
          const moveY = y * 0.2;

          this.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
        });

        button.addEventListener('mouseleave', function() {
          this.style.transform = '';
        });
      });
    }

    // ========================================================================
    // PARALLAX HERO - Subtle depth effect
    // ========================================================================
    if (!prefersReducedMotion) {
      const heroImage = document.querySelector('.hero-image');
      let parallaxTicking = false;

      if (heroImage) {
        window.addEventListener('scroll', function() {
          if (!parallaxTicking) {
            raf(function() {
              const scrolled = window.pageYOffset;
              const parallaxSpeed = scrolled * 0.3;

              if (scrolled < window.innerHeight) {
                heroImage.style.transform = `translateY(${parallaxSpeed}px)`;
              }
              parallaxTicking = false;
            });
            parallaxTicking = true;
          }
        }, { passive: true });
      }
    }

    // ========================================================================
    // LOADING STATES FOR BUY BUTTONS - Visual feedback
    // ========================================================================
    const buyButtons = document.querySelectorAll('a[href*="/cart/add"], .buy-button');

    buyButtons.forEach(function(button) {
      button.addEventListener('click', function(e) {
        // Don't prevent default, but add loading state
        const originalHTML = this.innerHTML;

        // Add loading state
        this.style.pointerEvents = 'none';
        this.style.opacity = '0.7';
        this.innerHTML = '<span class="spinner" style="width: 1rem; height: 1rem; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; display: inline-block; animation: spin 0.6s linear infinite;"></span>';

        // Add spinner animation if not exists
        if (!document.querySelector('#spinner-keyframes')) {
          const style = document.createElement('style');
          style.id = 'spinner-keyframes';
          style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
          document.head.appendChild(style);
        }

        // Reset after 2 seconds (fallback)
        setTimeout(() => {
          this.style.pointerEvents = '';
          this.style.opacity = '';
          this.innerHTML = originalHTML;
        }, 2000);
      });
    });

    // ========================================================================
    // TOAST NOTIFICATIONS - Elegant feedback system
    // ========================================================================
    window.showToast = function(message, type = 'success', duration = 3000) {
      const toast = document.createElement('div');
      toast.className = 'toast toast-' + type;
      toast.textContent = message;
      toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: var(--wacat-navy);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        font-size: 0.875rem;
        font-weight: 500;
      `;

      if (type === 'success') {
        toast.style.background = '#059669';
      } else if (type === 'error') {
        toast.style.background = '#DC2626';
      } else if (type === 'warning') {
        toast.style.background = '#F59E0B';
      }

      document.body.appendChild(toast);

      // Animate in
      setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
      }, 10);

      // Remove after duration
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 300);
      }, duration);
    };

    // ========================================================================
    // INTERSECTION ANIMATIONS - Reveal on scroll with stagger (DISABLED for visibility)
    // ========================================================================
    // Commented out to ensure all elements are visible by default
    // Elements should be visible without JavaScript for progressive enhancement

    // ========================================================================
    // ENHANCED FOCUS STATES - Keyboard navigation
    // ========================================================================
    let isUsingKeyboard = false;

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        isUsingKeyboard = true;
        document.body.classList.add('using-keyboard');
      }
    });

    document.addEventListener('mousedown', function() {
      isUsingKeyboard = false;
      document.body.classList.remove('using-keyboard');
    });

    // ========================================================================
    // SMART IMAGE LOADING - Skeleton screens
    // ========================================================================
    const images = document.querySelectorAll('img[loading="lazy"]');

    images.forEach(function(img) {
      if (!img.complete) {
        // Add skeleton overlay
        const skeleton = document.createElement('div');
        skeleton.className = 'skeleton';
        skeleton.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%);
          background-size: 200% 100%;
          animation: skeleton-loading 1.5s ease-in-out infinite;
          border-radius: inherit;
        `;

        const wrapper = img.parentElement;
        if (wrapper) {
          wrapper.style.position = 'relative';
          wrapper.appendChild(skeleton);
        }

        img.addEventListener('load', function() {
          if (skeleton.parentElement) {
            skeleton.style.opacity = '0';
            setTimeout(() => {
              if (skeleton.parentElement) {
                skeleton.parentElement.removeChild(skeleton);
              }
            }, 300);
          }
        });
      }
    });

    // ========================================================================
    // PERFORMANCE HINTS - Prefetch on hover
    // ========================================================================
    const prefetchLinks = document.querySelectorAll('a[href^="#"]');

    prefetchLinks.forEach(function(link) {
      link.addEventListener('mouseenter', function() {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
          // Could prefetch related content here
          // For now, just prepare the target for smooth transition
          const target = document.querySelector(href);
          if (target) {
            target.style.willChange = 'transform, opacity';
          }
        }
      }, { passive: true });

      link.addEventListener('mouseleave', function() {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
          const target = document.querySelector(href);
          if (target) {
            setTimeout(() => {
              target.style.willChange = 'auto';
            }, 500);
          }
        }
      }, { passive: true });
    });

    console.log('✨ Ultra UX enhancements loaded');
  });

})();
