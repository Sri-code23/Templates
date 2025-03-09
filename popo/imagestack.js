
document.addEventListener("DOMContentLoaded", function () {
    let cardContainer = document.querySelector(".image_container");

    cardContainer.addEventListener("click", () => {
        let cards = document.querySelectorAll(".card");

        if (cards.length < 2) return;

        let topCard = cards[0];

        // Add swipe animation
        topCard.classList.add("swipe");

        setTimeout(() => {
            // Move the swiped card to the back
            cardContainer.appendChild(topCard);
            topCard.classList.remove("swipe");

            // Reset stacking
            let allCards = document.querySelectorAll(".card");
            allCards.forEach((card, idx) => {
                card.style.zIndex = allCards.length - idx;
                card.style.transform = `scale(${1 - idx * 0.05}) translateY(${idx * 10}px)`;
                card.style.opacity = `${1 - idx * 0.15}`;
            });

        }, 600);
    });
});