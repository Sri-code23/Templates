const elements = [
    "Home", "About", "Services", "Portfolio", "Contact",
    "Blog", "Testimonials", "Careers", "FAQ", "Support"
];

const wrapper = document.querySelector(".scroll-wrapper");

function createScrollingElements() {
    for (let i = 0; i < 2; i++) { // Duplicate for smooth looping
        elements.forEach((text, index) => {
            let div = document.createElement("div");
            div.classList.add("element");
            div.textContent = text;
            div.style.width = `${120 + (index * 15)}px`; // Varying width
            wrapper.appendChild(div);
        });
    }
}

createScrollingElements();