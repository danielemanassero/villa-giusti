// Gestione Burger Menu
const burgerMenu = document.getElementById('burgerMenu');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle del menu
burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Chiusura menu quando si clicca su un link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Chiusura menu quando si clicca fuori
document.addEventListener('click', (e) => {
    if (!burgerMenu.contains(e.target) && !navMenu.contains(e.target)) {
        burgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Evidenziazione della sezione attiva nella navbar
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Animazione hover titolo "We Take Care"
const takeCareTitle = document.querySelector('.take-care-title');

takeCareTitle.addEventListener('mouseenter', () => {
    takeCareTitle.classList.add('active');
});

takeCareTitle.addEventListener('mouseleave', () => {
    takeCareTitle.classList.remove('active');
});

// Effetto navbar al scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

// window.addEventListener('scroll', () => {
//     const currentScroll = window.pageYOffset;
    
//     if (currentScroll > 100) {
//         navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
//     } else {
//         navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
//     }
    
//     lastScroll = currentScroll;
// });

// Smooth scroll per browser che non lo supportano nativamente
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});
