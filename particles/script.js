// Particle animation for hero section
const canvas = document.getElementById('particleCanvas');
// Get the 2D drawing context 
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const particle of particles) {
        particle.update();
        particle.draw();
    }

    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});







// Portfolio filtering
const portfolioData = [
    { id: 1, title: "Digital Dreamscape", category: "digital", image: "/placeholder.svg?height=400&width=600", year: "2024" },
    { id: 2, title: "Abstract Harmony", category: "paintings", image: "/placeholder.svg?height=400&width=600", year: "2023" },
    { id: 3, title: "Metal Flow", category: "sculptures", image: "/placeholder.svg?height=400&width=600", year: "2024" },
    { id: 4, title: "Neon Nights", category: "digital", image: "/placeholder.svg?height=400&width=600", year: "2023" },
    { id: 5, title: "Nature's Whisper", category: "paintings", image: "/placeholder.svg?height=400&width=600", year: "2024" },
    { id: 6, title: "Bronze Echo", category: "sculptures", image: "/placeholder.svg?height=400&width=600", year: "2023" },
];

const portfolioGrid = document.querySelector('.portfolio-grid');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderPortfolioItems(items) {
    portfolioGrid.innerHTML = '';
    items.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.classList.add('portfolio-item');
        portfolioItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="portfolio-item-overlay">
                <h3>${item.title}</h3>
                <p>${item.year}</p>
            </div>
        `;
        portfolioGrid.appendChild(portfolioItem);
    });
}

function filterPortfolio(category) {
    const filteredItems = category === 'all' 
        ? portfolioData 
        : portfolioData.filter(item => item.category === category);
    renderPortfolioItems(filteredItems);
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterPortfolio(button.dataset.category);
    });
});

// Initial render
renderPortfolioItems(portfolioData);

// Form validation
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name.length < 2) {
        alert('Name must be at least 2 characters.');
        return;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (message.length < 10) {
        alert('Message must be at least 10 characters.');
        return;
    }

    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email, message });
    alert('Message sent successfully!');
    contactForm.reset();
});

// Update copyright year
document.getElementById('current-year').textContent = new Date().getFullYear();
