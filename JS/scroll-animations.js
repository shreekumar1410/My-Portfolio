// Add this to your existing JavaScript file (script.js)

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initScrollAnimations();
    
    // Apply animation classes to elements
    applyAnimationClasses();
  });
  
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .scale-in, .slide-in-left, .slide-in-right, .rotate-in, .bounce-in, .glow-in, .text-reveal');
    
    // Check if modern view timeline is supported
    const supportsViewTimeline = CSS.supports('(animation-timeline: view())');
    
    if (!supportsViewTimeline) {
      // Use Intersection Observer for browsers that don't support view() timeline
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // If it's a staggered animation container, add visible class to children
            if (entry.target.classList.contains('stagger-animation')) {
              const children = entry.target.children;
              Array.from(children).forEach((child, index) => {
                setTimeout(() => {
                  child.classList.add('visible');
                }, index * 100);
              });
            }
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      });
      
      animatedElements.forEach(el => {
        observer.observe(el);
      });
      
      // Also observe staggered animation containers
      document.querySelectorAll('.stagger-animation').forEach(container => {
        observer.observe(container);
      });
    }
  }
  
  function applyAnimationClasses() {
    // Apply animation classes to specific elements
    
    // Section titles
    document.querySelectorAll('.section-title').forEach(el => {
      el.classList.add('fade-in');
    });
    
    // About section
    if (document.querySelector('.about-subtitle')) {
      document.querySelector('.about-subtitle').classList.add('slide-in-left');
    }
    
    if (document.querySelector('.about-description')) {
      document.querySelector('.about-description').classList.add('fade-in');
    }
    
    // Skills section
    document.querySelectorAll('.skills-title').forEach(el => {
      el.classList.add('fade-in');
    });
    
    document.querySelectorAll('.skills-list').forEach(el => {
      el.classList.add('stagger-animation');
    });
    
    document.querySelectorAll('.skills-grid').forEach(el => {
      el.classList.add('stagger-animation');
    });
    
    // Social icons
    document.querySelectorAll('.social-icon').forEach(el => {
      el.classList.add('rotate-in');
    });
    
    // Projects section
    document.querySelectorAll('.project-card').forEach(el => {
      el.classList.add('scale-in');
    });
    
    // Contact section elements
    document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(el => {
      el.classList.add('slide-in-left');
    });
    
    document.querySelectorAll('.contact-form button').forEach(el => {
      el.classList.add('bounce-in');
    });
    
    // Hero section
    if (document.querySelector('.hero-text h1')) {
      wrapTextForReveal(document.querySelector('.hero-text h1'));
      document.querySelector('.hero-text h1').classList.add('text-reveal');
    }
    
    if (document.querySelector('.hero-text .description')) {
      document.querySelector('.hero-text .description').classList.add('fade-in');
    }
    
    if (document.querySelector('.hero-image')) {
      document.querySelector('.hero-image').classList.add('slide-in-right');
    }
    
    // Add support for modern view timeline animations
    if (CSS.supports('(animation-timeline: view())')) {
      convertToViewTimeline();
    }
  }
  
  function wrapTextForReveal(element) {
    const text = element.innerHTML;
    element.innerHTML = `<span class="inner">${text}</span>`;
  }
  
  function convertToViewTimeline() {
    // Convert traditional animations to view timeline based ones
    document.querySelectorAll('.fade-in').forEach(el => {
      el.classList.add('view-timeline-fade');
      el.classList.remove('fade-in');
    });
    
    document.querySelectorAll('.scale-in').forEach(el => {
      el.classList.add('view-timeline-scale');
      el.classList.remove('scale-in');
    });
    
    document.querySelectorAll('.slide-in-left').forEach(el => {
      el.classList.add('view-timeline-slide-left');
      el.classList.remove('slide-in-left');
    });
    
    document.querySelectorAll('.slide-in-right').forEach(el => {
      el.classList.add('view-timeline-slide-right');
      el.classList.remove('slide-in-right');
    });
  }