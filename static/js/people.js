document.addEventListener("DOMContentLoaded", setup);

// Setup function that is called after the Document Object Model is loaded 
async function setup() {

  // Connect to the people database
  const res = await fetch('./static/data/people.json');
  const data = await res.json();

  // Render the PI, PHD Students, Undergrad Students, & Alumni Students
  renderPI(data.principal_investigator[0], 'raquel-section');
  renderStudents(data.phd_students, 'phd-students-container');
  renderStudents(data.undergraduate_students, 'undergrad-students-container');
  renderAlumni(data.alumni_students, 'alumni-container');

  // Once all sections are rendered, setup the arced names
  applyArcNames();

  // Setup dropdown arrow toggles for bios
  setupPersonToggles();

  // Staggered fade-in for headings and student cards
  const headings = document.querySelectorAll('#people-title, .people-headings');
  const cards = document.querySelectorAll('.student');

  headings.forEach((heading) => {
    heading.classList.add('visible');
  });

  cards.forEach((card, i) => {
    setTimeout(() => {
      card.classList.add('visible');
    }, 200 + i * 180);
  });

  // To prevent footer from flashing before people are rendered only show the body after the page is loaded
  document.body.style.visibility = 'visible';

  // Setup mobile hamburger nav toggle
  setupNavToggle();

}

// Used to setup raquel-section 
function renderPI(pi, containerId) {

  // gets the container we are updating 
  const container = document.getElementById(containerId);
  if (!container || !pi) return;

  // Creates the div
  const div = document.createElement('div');
  div.className = 'student';

  // Sets the div's innerHTML
  div.innerHTML = `
  <h3 class="person-name">${pi.name}</h3>
  <img class="headshots" src="${pi.image}" alt="${pi.name}">
  <div class="pi-text">
    <p>${pi.bio}</p>
    ${pi.linkedin ? `<a class="linkedin-link" href="${pi.linkedin}" target="_blank">LinkedIn ↗</a>` : ''}
  </div>
`;

  // Adds the div to the end of the container 
  container.appendChild(div);
}

// Used to setup both the phd-students-container & undergrad-students-container 
function renderStudents(students, containerId) {

  // gets the container we are updating
  const container = document.getElementById(containerId);
  if (!container) return;

  // then for each of that groups students 
  students.forEach(student => {
    
    // Creates the div
    const div = document.createElement('div');
    div.className = 'student';

    // Sets the image based on if there is an imageWrapper 
    let imgHTML;
    if (student.imageWrapper) {  
      imgHTML = `
        <div class="${student.imageWrapper}">
          <img src="${student.image}" alt="">
        </div>`;
    } else {
      imgHTML = `<img class="headshots" src="${student.image}" alt="${student.name}">`;
    }

    // Sets the linkedin link if available
    const linkedinHTML = student.linkedin
      ? `<a class="linkedin-link" href="${student.linkedin}" target="_blank">LinkedIn ↗</a>`
      : '';

    // Sets the div's innerHTML with the arrow button directly after the name
    div.innerHTML = `
      <div class="person-name-row">
        <h3 class="person-name">${student.name}</h3>
        ${student.bio ? `<button class="person-card-toggle" aria-expanded="false"><span class="toggle-arrow">▼</span></button>` : ''}
      </div>
      ${imgHTML}
      ${student.bio ? `<div class="person-card-content" hidden><p>${student.bio}</p>${linkedinHTML}</div>` : linkedinHTML}
    `;

    // Adds the div to the end of the container 
    container.appendChild(div);
  });
}

// Used to setup the alumni-container
function renderAlumni(alumni, containerId) {

  // Gets the container we are updating 
  const container = document.getElementById(containerId);
  if (!container || !alumni) return;

  // for each of the alumni 
  alumni.forEach(person => {

    // Creates the div 
    const div = document.createElement('div');
    div.className = 'student';

    // Sets the div's innerHTML
    div.innerHTML = `
      <h3 class="person-name">${person.name}</h3>
      <img class="headshots" src="${person.image}" alt="${person.name}">
    `;

    // Adds the div to the end of the container 
    container.appendChild(div);
  });
}

// Used to setup dropdown arrow toggles for bios on each person card
function setupPersonToggles() {
  const cards = Array.from(document.querySelectorAll('.student'));

  cards.forEach(card => {
    const toggle = card.querySelector('.person-card-toggle');
    const content = card.querySelector('.person-card-content');
    if (!toggle || !content) return;

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      content.hidden = expanded;
      toggle.querySelector('.toggle-arrow').style.transform = expanded ? '' : 'rotate(180deg)';
    });
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

// Used to apply an arc style to the names of each of the people on the HELI website 
function applyArcNames() {

  // First pass: collect all cards and compute a uniform font size
  const cards = [...document.querySelectorAll('.student')].filter(card => {
    return card.querySelector('h3.person-name') &&
      (card.querySelector('img.headshots') || card.querySelector('.headshots-tan, .headshots-purple'));
  });

  // Use a fixed reference size so all names scale identically
  const REFERENCE_SIZE = 350;
  const r = REFERENCE_SIZE / 2 + 10;
  const arcLength = Math.PI * r; // half-circumference (the visible arc)
  const MAX_FONT = 26;
  const MIN_FONT = 12;

  // Find the longest name to set a shared font size across all cards
  const longestName = cards.reduce((max, card) => {
    const name = card.querySelector('h3.person-name').textContent.trim();
    return name.length > max ? name.length : max;
  }, 0);

  // Find a font size that fits longest name
  const sharedFontSize = Math.min(MAX_FONT, Math.max(MIN_FONT,
    Math.floor(arcLength / (longestName * 0.55))
  ));

  cards.forEach((card, i) => {
    const h3 = card.querySelector('h3.person-name');
    const imgEl = card.querySelector('img.headshots') ||
      card.querySelector('.headshots-tan img, .headshots-purple img');
    const wrapEl = card.querySelector('img.headshots')
      ? card.querySelector('img.headshots')
      : card.querySelector('.headshots-tan, .headshots-purple');

    if (!imgEl) return;

    // Use only the text content of the name, excluding the button text
    const nameNode = [...h3.childNodes].find(n => n.nodeType === Node.TEXT_NODE);
    const name = nameNode ? nameNode.textContent.trim() : h3.textContent.trim();

    const size = REFERENCE_SIZE;
    const cx = size / 2;
    const cy = size / 2;
    const id = `arc-${i}`;

    const wrap = document.createElement('div');
    wrap.className = 'headshot-wrap';
    wrapEl.parentNode.insertBefore(wrap, wrapEl);
    wrap.appendChild(wrapEl);

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
    svg.innerHTML = `
      <defs>
        <path id="${id}" d="M ${cx - r},${cy} a ${r},${r} 0 0,1 ${r * 2},0"/>
      </defs>
      <text font-size="${sharedFontSize}" font-weight="bold" fill="#111" letter-spacing="0.5">
        <textPath href="#${id}" startOffset="25%" text-anchor="middle">${name}</textPath>
      </text>`;

    wrap.appendChild(svg);

    // If this card has a toggle button, move it inside the wrap so it sits alongside the arc name
    const toggle = card.querySelector('.person-card-toggle');
    if (toggle) {
      wrap.appendChild(toggle);
    }
  });
}