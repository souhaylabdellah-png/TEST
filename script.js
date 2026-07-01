// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
});

// Fermer le menu mobile quand un lien est cliqué
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.style.display = 'none';
    });
});

// Smooth scroll et highlight du lien actif
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Gestion du formulaire de contact
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputs = contactForm.querySelectorAll('input, textarea');
    const formData = new FormData();

    inputs.forEach(input => {
        formData.append(input.name || input.tagName.toLowerCase(), input.value);
    });

    // Simulation d'envoi
    formMessage.textContent = '⏳ Envoi en cours...';
    formMessage.style.display = 'block';
    formMessage.style.color = '#0056b3';

    setTimeout(() => {
        formMessage.textContent = '✓ Merci! Votre message a été envoyé avec succès.';
        formMessage.style.color = '#28a745';
        contactForm.reset();

        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 4000);
    }, 1000);
});

// Animation de défilement des éléments
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.about-card, .service-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Bouton CTA - Scroll vers services
document.querySelector('.cta-button').addEventListener('click', () => {
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
});

// Styles CSS dynamiques pour le menu mobile actif
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            flex-direction: column;
            background: white;
            border-bottom: 1px solid #e0e0e0;
            padding: 1rem 0;
            gap: 0;
        }

        .nav-link {
            padding: 1rem 2rem;
            display: block;
            border-bottom: 1px solid #f0f0f0;
        }

        .nav-link::after {
            display: none;
        }

        .nav-link:hover {
            background: #f8f9fa;
        }

        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(8px, 8px);
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
        }
    }
`;
document.head.appendChild(style);

// Effet de parallaxe léger
window.addEventListener('scroll', () => {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${window.pageYOffset * 0.5}px)`;
    }
});

// Ajouter une classe active au nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});
