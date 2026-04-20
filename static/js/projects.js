document.addEventListener("DOMContentLoaded", setupProjects);

async function setupProjects() {
    const response = await fetch("./static/data/projects.json");
    const projects = await response.json();

    renderProjects(projects, "projects-list");
    setupProjectToggles();
    setupProjectsAnimations();
    document.body.style.visibility = "visible";
    setupNavToggle(); 
}
// Used to setup the mobile hamburger nav toggle
function setupNavToggle() {
  const toggle = document.getElementById('navToggle');
  const overlay = document.getElementById('navOverlay');
  const close = document.getElementById('navClose');

  if (!toggle || !overlay || !close) return;

  toggle.addEventListener('click', () => {
    overlay.classList.add('open');
    toggle.style.display = 'none';        // hide hamburger when overlay opens
  });

  close.addEventListener('click', () => {
    overlay.classList.remove('open');
    toggle.style.display = 'block';       // restore hamburger when overlay closes
  });
}
function renderProjects(projects, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    projects.forEach((project) => {
        const article = document.createElement("article");
        article.className = ["project-card", project.modifierClass].filter(Boolean).join(" ");
        article.id = `project-${project.id}`;

        const contentId = `project-${project.id}-content`;
        const linkHref = project.link || "#";

        article.innerHTML = `
            <button class="project-card-toggle" type="button" aria-expanded="false" aria-controls="${contentId}">
                <span class="project-card-title">${project.title}</span>
                <span class="project-card-summary-action">Know more <span aria-hidden="true">↓</span></span>
            </button>
            <div class="project-card-content" id="${contentId}" hidden>
                <p>${project.description}</p>
                <div class="project-card-footer">
                    <a href="${linkHref}" class="project-card-link">Link</a>
                    <button class="project-card-close" type="button" aria-label="Collapse ${project.title} details">×</button>
                </div>
            </div>
        `;

        container.appendChild(article);
    });
}

function setupProjectToggles() {
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
}

function setupProjectsAnimations() {
    const elements = document.querySelectorAll(
        ".projects-page .projects-hero h1, .projects-page .project-card, .projects-page .projects-back-to-top"
    );

    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add("visible");
        }, 180 + index * 120);
    });
}
