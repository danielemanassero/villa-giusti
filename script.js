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


// Animazione hover titolo "We Take Care"
const takeCareTitle = document.querySelector('.take-care-title');

takeCareTitle.addEventListener('mouseenter', () => {
    takeCareTitle.classList.add('active');
});

takeCareTitle.addEventListener('mouseleave', () => {
    takeCareTitle.classList.remove('active');
});


// Animazione hover su foto Villa Giusti per versione Desktop
const buildVillaGiusti = document.querySelector('#build-photo .container');

buildVillaGiusti.addEventListener('mouseenter', () => {
    buildVillaGiusti.classList.add('full');
});


// Carousel camere: pallini di navigazione
const roomsCarousel = document.getElementById('rooms-carousel');
const rooms = Array.from(roomsCarousel.querySelectorAll('.room'));
const carouselDots = document.querySelector('.carousel-dots');

const dots = rooms.map((room, index) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    dot.setAttribute('aria-label', `Vai alla camera ${index + 1}`);
    dot.addEventListener('click', () => {
        roomsCarousel.scrollTo({ left: room.offsetLeft, behavior: 'smooth' });
    });
    carouselDots.appendChild(dot);
    return dot;
});

roomsCarousel.addEventListener('scroll', () => {
    let closestIndex = 0;
    let closestDistance = Infinity;

    rooms.forEach((room, index) => {
        const distance = Math.abs(room.offsetLeft - roomsCarousel.scrollLeft);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
        }
    });

    dots.forEach((dot, index) => dot.classList.toggle('active', index === closestIndex));
});

dots[0].classList.add('active');

// Carousel camere: trascinamento laterale (mouse su desktop, swipe su mobile)
let isDraggingCarousel = false;
let dragStartX = 0;
let dragStartScrollLeft = 0;

roomsCarousel.addEventListener('pointerdown', (e) => {
    isDraggingCarousel = true;
    roomsCarousel.classList.add('dragging');
    dragStartX = e.clientX;
    dragStartScrollLeft = roomsCarousel.scrollLeft;
    roomsCarousel.setPointerCapture(e.pointerId);
});

roomsCarousel.addEventListener('pointermove', (e) => {
    if (!isDraggingCarousel) return;
    roomsCarousel.scrollLeft = dragStartScrollLeft - (e.clientX - dragStartX);
});

roomsCarousel.addEventListener('pointerup', () => {
    isDraggingCarousel = false;
    roomsCarousel.classList.remove('dragging');
});

roomsCarousel.addEventListener('pointercancel', () => {
    isDraggingCarousel = false;
    roomsCarousel.classList.remove('dragging');
});