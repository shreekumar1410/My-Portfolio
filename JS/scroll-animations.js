document.addEventListener('DOMContentLoaded', function() {
  // Hide loading screen after content loads
  const loading = document.querySelector('.loading');
  if (loading) {
      setTimeout(() => {
          loading.classList.add('hidden');
      }, 1000);
  }

  // Initialize intersection observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
          }
      });
  }, {
      threshold: 0.1,
      rootMargin: '0px'
  });

  // Observe elements with animation classes
  const animatedElements = document.querySelectorAll(`
      .animate-on-scroll,
      .about-content,
      .skills-container,
      .skill-item,
      .project-card,
      .contact-container
  `);

  animatedElements.forEach(el => observer.observe(el));

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              const headerOffset = window.innerWidth <= 768 ? 70 : 0;
              const elementPosition = targetElement.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

              window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
              });
          }
      });
  });

  // Update active navigation link on scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveLink() {
      const currentPos = window.scrollY;
      const headerOffset = window.innerWidth <= 768 ? 70 : 0;

      sections.forEach(section => {
          const sectionTop = section.offsetTop - headerOffset;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (currentPos >= sectionTop && currentPos < sectionBottom) {
              const id = section.getAttribute('id');
              navLinks.forEach(link => {
                  link.classList.remove('active');
                  if (link.getAttribute('href') === `#${id}`) {
                      link.classList.add('active');
                  }
              });
          }
      });
  }

  // Throttle scroll event for better performance
  let isScrolling = false;
  window.addEventListener('scroll', () => {
      if (!isScrolling) {
          window.requestAnimationFrame(() => {
              updateActiveLink();
              isScrolling = false;
          });
          isScrolling = true;
      }
  });

  // Initialize typing animation
  const typingElement = document.querySelector('.typing-text');
  const skills = [
      "Software Developer",
      "Front-End Developer",
      "Web Developer"
  ];
  let skillIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;
  let deletingDelay = 50;
  let newSkillDelay = 2000;

  function type() {
      const currentSkill = skills[skillIndex];
      
      if (typingElement) {
          if (!isDeleting) {
              // Typing
              typingElement.innerHTML = `
                  <span class="text">${currentSkill.substring(0, charIndex)}</span>
                  <span class="cursor">|</span>
              `;
              charIndex++;

              if (charIndex > currentSkill.length) {
                  isDeleting = true;
                  setTimeout(type, newSkillDelay);
                  return;
              }
          } else {
              // Deleting
              typingElement.innerHTML = `
                  <span class="text">${currentSkill.substring(0, charIndex)}</span>
                  <span class="cursor">|</span>
              `;
              charIndex--;

              if (charIndex === 0) {
                  isDeleting = false;
                  skillIndex = (skillIndex + 1) % skills.length;
              }
          }
      }

      setTimeout(type, isDeleting ? deletingDelay : typingDelay);
  }

  if (typingElement) {
      type();
  }
});