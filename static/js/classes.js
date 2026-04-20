document.addEventListener("DOMContentLoaded", setupClasses);

async function setupClasses() {
  const response = await fetch("./static/data/classes.json");
  const classes = await response.json();

  renderClasses(classes, "classes-grid");
  setupClassesAnimations();
  document.body.style.visibility = "visible";
  setupNavToggle(); 
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
