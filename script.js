 // Fade In Cards on Scroll
const cards = document.querySelectorAll(".extra-card");

function revealCards() {
    cards.forEach(card => {
        const position = card.getBoundingClientRect().top;
        if (position < window.innerHeight - 100) {
            card.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", revealCards);
window.addEventListener("load", revealCards);


// Menu Toggle
document.querySelectorAll(".menu-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {
        const menu = btn.nextElementSibling;

        if (menu.style.display === "block") {
            menu.style.display = "none";
            btn.innerText = "View Menu";
        } else {
            menu.style.display = "block";
            btn.innerText = "Hide Menu";
        }
    });
});
