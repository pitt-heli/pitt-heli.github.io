document.addEventListener("DOMContentLoaded", setup);

async function setup() {
  const res = await fetch('./static/data/people.json');
  const data = await res.json();

  renderPI(data.principal_investigator[0], 'raquel-section');
  renderStudents(data.phd_students, 'phd-students-container');
  renderStudents(data.undergraduate_students, 'undergrad-students-container');
  renderAlumni(data.alumni_students, 'alumni-container');

  applyArcNames(); // ← run once after all sections are rendered
}

function renderPI(pi, containerId) {
  const container = document.getElementById(containerId);
  if (!container || !pi) return;

  const div = document.createElement('div');
  div.className = 'student';

  div.innerHTML = `
    <h3 class="person-name">${pi.name}</h3>
    <img class="headshots" src="${pi.image}" alt="${pi.name}">
    <p>${pi.bio}</p>
  `;

  container.appendChild(div);
}

function renderStudents(students, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  students.forEach(student => {
    const div = document.createElement('div');
    div.className = 'student';

    let imgHTML;
    if (student.imageWrapper) {
      imgHTML = `
        <div class="${student.imageWrapper}">
          <img src="${student.image}" alt="">
        </div>`;
    } else {
      imgHTML = `<img class="headshots" src="${student.image}" alt="${student.name}">`;
    }

    const bioHTML = student.bio
      ? `<p>${student.bio}</p>`
      : '';

    div.innerHTML = `
      <h3 class="person-name">${student.name}</h3>
      ${imgHTML}
      ${bioHTML}
    `;

    container.appendChild(div);
  });
}

function renderAlumni(alumni, containerId) {
  const container = document.getElementById(containerId);
  if (!container || !alumni) return;

  alumni.forEach(person => {
    const div = document.createElement('div');
    div.className = 'student';

    div.innerHTML = `
      <h3 class="person-name">${person.name}</h3>
      <img class="headshots" src="${person.image}" alt="${person.name}">
    `;

    container.appendChild(div);
  });
}

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

  // Approx chars-per-em ~0.55 — solve for font size that fits longest name
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
    const name = h3.textContent.trim();
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
        <textPath href="#${id}" startOffset="50%" text-anchor="middle">${name}</textPath>
      </text>`;

    wrap.appendChild(svg);
  });
}