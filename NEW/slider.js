const items = [
    {
        id: 1,
        title: "Python",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13h8"/><path d="M8 17h8"/><path d="M8 9h1"/></svg>`,
        description: "High-level programming language known for its simplicity and versatility. Perfect for web development, data science, and automation.",
    },
    {
        id: 2,
        title: "Django",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
        description: "Robust web framework that follows the model-template-view pattern, enabling rapid development of secure and maintainable websites.",
    },
    {
        id: 3,
        title: "PostgreSQL",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>`,
        description: "Advanced open-source database that provides reliability, feature robustness, and performance.",
    },
    {
        id: 4,
        title: "React",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
        description: "JavaScript library for building user interfaces with a component-based architecture and virtual DOM.",
    },
    {
        id: 5,
        title: "Node.js",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
        description: "Runtime environment that executes JavaScript code outside a web browser, perfect for building scalable network applications.",
    },
    {
        id: 6,
        title: "Docker",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10h16"/><path d="M4 14h16"/><path d="M4 18h16"/><path d="M4 6h16"/></svg>`,
        description: "Platform for developing, shipping, and running applications in containers, ensuring consistency across different environments.",
    },
    {
        id: 7,
        title: "AWS",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>`,
        description: "Comprehensive cloud platform offering a wide range of services for building sophisticated applications.",
    },
    {
        id: 8,
        title: "Next.js",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h10"/><path d="M7 12h10"/><path d="M7 17h10"/></svg>`,
        description: "React framework that enables functionality like server-side rendering and static site generation.",
    },
];

let activeIndex = 0;
const carouselViewport = document.getElementById('carouselViewport');
const descriptionContent = document.getElementById('descriptionContent');
const backgroundAnimation = document.getElementById('backgroundAnimation');

let startX = 0;
let currentX = 0;
let isDragging = false;

// Create background particles
for (let i = 0; i < 100; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.setProperty('--delay', `${Math.random() * 10}s`);
    particle.style.setProperty('--duration', `${10 + Math.random() * 20}s`);
    particle.style.setProperty('--size', `${1 + Math.random() * 3}px`);
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    backgroundAnimation.appendChild(particle);
}

function getItemStyle(index) {
    const position = (((index - activeIndex) % items.length) + items.length) % items.length;
    const isActive = position === 0;
    
    const angle = (position / items.length) * 2 * Math.PI;
    const radius = 250;
    
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius - radius;
    
    const scale = isActive ? 1 : 0.6 + (z + radius) / (2 * radius) * 0.4;
    const opacity = isActive ? 1 : 0.3 + (z + radius) / (2 * radius) * 0.7;
    
    return {
        transform: `translate3d(${x}px, 0, ${z}px) scale(${scale})`,
        opacity,
        zIndex: Math.round(1000 + z),
    };
}

function updateCarousel() {
    items.forEach((item, index) => {
        const style = getItemStyle(index);
        const element = document.querySelector(`[data-id="${item.id}"]`);
        if (element) {
            Object.assign(element.style, {
                transform: style.transform,
                opacity: style.opacity,
                zIndex: style.zIndex,
            });
            element.classList.toggle('active', index === activeIndex);
        }
    });

    document.querySelectorAll('.description-item').forEach((item, index) => {
        item.classList.toggle('active', index === activeIndex);
    });
}

// Touch and mouse event handlers
function handleDragStart(e) {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    currentX = startX;
    
    carouselViewport.style.transition = 'none';
}

function handleDragMove(e) {
    if (!isDragging) return;
    
    e.preventDefault();
    currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    const diff = currentX - startX;
    
    if (Math.abs(diff) > 50) {
        const direction = diff > 0 ? -1 : 1;
        activeIndex = (activeIndex + direction + items.length) % items.length;
        updateCarousel();
        isDragging = false;
        startX = currentX;
    }
}

function handleDragEnd() {
    isDragging = false;
    carouselViewport.style.transition = 'transform 0.5s ease-out';
}

// Create carousel items
items.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.className = `carousel-item ${index === activeIndex ? 'active' : ''}`;
    itemElement.setAttribute('data-id', item.id);
    itemElement.innerHTML = `
        <div class="item-icon">${item.icon}</div>
        <h2>${item.title}</h2>
    `;
    itemElement.addEventListener('click', () => {
        activeIndex = index;
        updateCarousel();
    });
    carouselViewport.appendChild(itemElement);

    const descriptionElement = document.createElement('div');
    descriptionElement.className = `description-item ${index === activeIndex ? 'active' : ''}`;
    descriptionElement.innerHTML = `
        <div class="description-header">
            ${item.icon}
            <h3>${item.title}</h3>
        </div>
        <p>${item.description}</p>
    `;
    descriptionContent.appendChild(descriptionElement);
});

// Add touch and mouse event listeners
carouselViewport.addEventListener('mousedown', handleDragStart);
carouselViewport.addEventListener('mousemove', handleDragMove);
carouselViewport.addEventListener('mouseup', handleDragEnd);
carouselViewport.addEventListener('mouseleave', handleDragEnd);

carouselViewport.addEventListener('touchstart', handleDragStart);
carouselViewport.addEventListener('touchmove', handleDragMove);
carouselViewport.addEventListener('touchend', handleDragEnd);
carouselViewport.addEventListener('touchcancel', handleDragEnd);

// Initialize carousel
updateCarousel();

// Auto-rotate (disabled when user is interacting)
let autoRotateInterval = setInterval(() => {
    if (!isDragging) {
        activeIndex = (activeIndex + 1) % items.length;
        updateCarousel();
    }
}, 4000);

// Reset auto-rotate when user interaction ends
carouselViewport.addEventListener('mouseup', () => {
    clearInterval(autoRotateInterval);
    autoRotateInterval = setInterval(() => {
        if (!isDragging) {
            activeIndex = (activeIndex + 1) % items.length;
            updateCarousel();
        }
    }, 4000);
});