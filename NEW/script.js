const texts = ["I'm a Developer", "I'm a Designer", "I'm a Creator", "I build things that matter"];
let textIndex = 0;

function changeText() {
    const changingTextElement = document.getElementById("changing-text");
    changingTextElement.style.animation = 'none';
    changingTextElement.offsetHeight;
    changingTextElement.style.animation = 'fadeInText 2s forwards';
    
    textIndex = (textIndex + 1) % texts.length;
    changingTextElement.innerText = texts[textIndex];
}

setInterval(changeText, 4000);

function generateSymbols() {
    const symbols = ['</>', '{}', '() => {}', '#CSS', 'console.log()', '<HTML>', 'def function():', '@media', 'const var', 'return ()'];
    const symbolsContainer = document.querySelector(".symbols");
    symbolsContainer.innerHTML = "";
    
    for (let i = 0; i < 50; i++) {
        const span = document.createElement("span");
        span.className = 'symbol';
        span.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        span.style.left = Math.random() * 100 + "%";
        span.style.animationDuration = (Math.random() * 10 + 10) + "s";
        span.style.animationDelay = (Math.random() * 10) + "s";
        symbolsContainer.appendChild(span);
    }
}

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close the menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Close the menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Initialize symbols and keep regenerating
generateSymbols();
setInterval(generateSymbols, 30000);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Show/hide nav on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const navContainer = document.querySelector('.nav-container');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        navContainer.style.transform = 'translateY(-100%)';
    } else {
        navContainer.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});