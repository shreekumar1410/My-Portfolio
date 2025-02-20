
document.addEventListener('DOMContentLoaded', function () {
    loadSavedTheme();

    // Set initial theme attribute
    if (!document.body.hasAttribute('data-theme')) {
        document.body.setAttribute('data-theme', 'light');
    }

    // Handle nav-link clicks for mobile view
    const navLinks = document.querySelectorAll('.nav-links a');
    const sidebar = document.querySelector('.sidebar');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (window.innerWidth <= 800) { // Only for mobile view
                // Close the mobile menu
                sidebar.classList.remove('mobile-active');

                // Ensure nav-links are hidden in mobile view
                const navLinksContainer = document.querySelector('.nav-links');
                navLinksContainer.style.display = 'none';

                // Small delay to ensure smooth scrolling
                setTimeout(() => {
                    navLinksContainer.style.display = '';
                }, 300);
            }
        });
    });
});

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const toggleBtn = document.querySelector('.toggle-btn i');

    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
    toggleBtn.classList.toggle('fa-chevron-right');
    toggleBtn.classList.toggle('fa-chevron-left');
}

function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('mobile-active');
}

function resetToHome() {
    window.location.href = '#home';
}

function toggleTheme() {
    const body = document.body;
    const themeLabel = document.querySelector('.theme-toggle-label');
    const themeIcon = document.querySelector('.theme-toggle-icon');

    if (body.getAttribute('data-theme') === 'dark') {
        body.setAttribute('data-theme', 'light');
        themeLabel.textContent = 'Light Mode';
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeLabel.textContent = 'Dark Mode';
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }

    localStorage.setItem('theme', body.getAttribute('data-theme') || 'light');
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        const body = document.body;
        const themeLabel = document.querySelector('.theme-toggle-label');
        const themeIcon = document.querySelector('.theme-toggle-icon');

        if (savedTheme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            themeLabel.textContent = 'Dark Mode';
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
}

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveSection() {
    const scrollPosition = window.scrollY + (window.innerWidth <= 800 ? 70 : 0); // Add offset for mobile

    sections.forEach(section => {
        const sectionTop = section.offsetTop - (window.innerWidth <= 800 ? 70 : 100);
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Add smooth scroll behavior with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const offset = window.innerWidth <= 800 ? 70 : 0; // Adjust offset based on viewport

        window.scrollTo({
            top: targetElement.offsetTop - offset,
            behavior: 'smooth'
        });
    });
});

function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

window.addEventListener('scroll', throttle(updateActiveSection, 100));
window.addEventListener('load', updateActiveSection);

// Initialize skill bars animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.getAttribute('data-width');
        }
    });
});

document.querySelectorAll('.skill-progress').forEach(bar => {
    bar.setAttribute('data-width', bar.style.width);
    bar.style.width = '0';
    observer.observe(bar);
});

document.addEventListener('DOMContentLoaded', function() {
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
                    setTimeout(type, newSkillDelay); // Pause before deleting
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

// Project

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const projectCards = document.querySelectorAll('.project-card');

    function filterProjects() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        projectCards.forEach(card => {
            const title = card.querySelector('.project-title').textContent.toLowerCase();
            const description = card.querySelector('.project-description').textContent.toLowerCase();
            const category = card.dataset.category;

            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || category === selectedCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
                // Add fade-in animation
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 50);
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchInput.addEventListener('input', filterProjects);
    categoryFilter.addEventListener('change', filterProjects);

    // Initialize AOS for scroll animations if you're using it
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true
        });
    }
});