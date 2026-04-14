document.addEventListener("DOMContentLoaded", setupClasses);

async function setupClasses() {
  const response = await fetch("./static/data/classes.json");
  const classes = await response.json();

  renderClasses(classes, "classes-grid");
  setupClassesAnimations();
  document.body.style.visibility = "visible";
}

function renderClasses(classes, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  classes.forEach((course) => {
    const article = document.createElement("article");
    article.className = ["class-card", course.modifierClass].filter(Boolean).join(" ");

    article.innerHTML = `
      <h2>${course.title}</h2>
      <div class="class-card-body">
        <p>${course.description}</p>
      </div>
    `;

    container.appendChild(article);
  });
}

function setupClassesAnimations() {
  const elements = document.querySelectorAll(
    ".classes-page .classes-hero h1, .classes-page .class-card, .classes-page .classes-back-to-top"
  );

  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add("visible");
    }, 180 + index * 120);
  });
}
