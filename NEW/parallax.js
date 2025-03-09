const galleryItems = document.querySelectorAll('.gallery-item');

document.addEventListener("mousemove", (event) => {
    let x = (window.innerWidth / 2 - event.pageX) / 50;
    let y = (window.innerHeight / 2 - event.pageY) / 50;

    requestAnimationFrame(() => {
        galleryItems.forEach((item, index) => {
            let depth = (index + 1) * 1;
            item.style.transform = `translate(${x * depth}px, ${y * depth}px) scale(1)`;
        });
    });
});
