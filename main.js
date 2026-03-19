// Menú Móvil
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Alterne Navegación
    nav.classList.toggle('nav-active');
    
    // Animación del botón hamburguesa
    burger.classList.toggle('toggle');
});

// Cerrar menú móvil al hacer clic en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if(nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
        }
    });
});

// Intersection Observer para animaciones en scroll
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// Efecto máquina de escribir para el texto dinámico principal
const roles = ["Desarrollador Web", "Socorrista", "Técnico Informático"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

const typetextElement = document.querySelector('.type-writer');

function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typetextElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typetextElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 1500; // Pausa antes de borrar
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pausa antes de escribir la siguiente palabra
    }
    
    setTimeout(type, typeSpeed);
}

// Iniciar efecto de máquina de escribir al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    if(typetextElement) {
        setTimeout(type, 1000);
    }
});
