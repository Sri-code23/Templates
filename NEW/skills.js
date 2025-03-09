document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach((item, index) => {
        // Randomize the floating animation
        item.style.animationDelay = `${Math.random() * 2}s`;

        // Add a staggered entrance animation
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);

        // Add mouseover event for custom tooltip positioning
        item.addEventListener('mouseover', (e) => {
            const tooltip = item.querySelector('.tooltip');
            tooltip.style.transform = 'translateY(0)';
        });

        // Add mouseout event to hide tooltip
        item.addEventListener('mouseout', (e) => {
            const tooltip = item.querySelector('.tooltip');
            tooltip.style.transform = 'translateY(100%)';
        });
    });
});