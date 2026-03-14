document.addEventListener("DOMContentLoaded", () => {
    const cards = Array.from(document.querySelectorAll(".project-card"));

    function setExpanded(card, expanded) {
        const toggle = card.querySelector(".project-card-toggle");
        const content = card.querySelector(".project-card-content");

        card.classList.toggle("project-card-expanded", expanded);
        toggle.setAttribute("aria-expanded", String(expanded));
        content.hidden = !expanded;
    }

    cards.forEach((card) => {
        const toggle = card.querySelector(".project-card-toggle");
        const close = card.querySelector(".project-card-close");

        toggle.addEventListener("click", () => {
            const expanded = card.classList.contains("project-card-expanded");
            setExpanded(card, !expanded);
        });

        close.addEventListener("click", (event) => {
            event.stopPropagation();
            setExpanded(card, false);
        });
    });
});
