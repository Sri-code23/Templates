document.addEventListener("DOMContentLoaded", function () {
    let cardContainer = document.querySelector(".swipe-container");

    cardContainer.addEventListener("click", () => {
        let cards = document.querySelectorAll(".card");

        if (cards.length < 2) return;

        let topCard = cards[0];

        // Add swipe animation
        topCard.style.transform = "translateY(-150%) rotate(-10deg)";
        topCard.style.opacity = "0";

        setTimeout(() => {
            // Move the swiped card to the back
            cardContainer.appendChild(topCard);
            topCard.style.transform = "";
            topCard.style.opacity = "1";

            // Reset stacking
            let allCards = document.querySelectorAll(".card");
            allCards.forEach((card, idx) => {
                card.style.zIndex = allCards.length - idx;
                card.style.transform = `scale(${1 - idx * 0.05}) rotate(${idx * -3}deg)`;
                card.style.opacity = `${1 - idx * 0.15}`;
            });

        }, 500);
    });
});