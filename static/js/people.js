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
  document.querySelectorAll('.student').forEach((card, i) => {
    const h3 = card.querySelector('h3.person-name');
    const img = card.querySelector('img.headshots');
    if (!h3 || !img) return;

    const name = h3.textContent.trim();
    const size = img.offsetWidth || 160;
    const r = size / 2 + 10;
    const cx = size / 2;
    const cy = size / 2;
    const id = `arc-${i}`;

    const wrap = document.createElement('div');
    wrap.className = 'headshot-wrap';
    img.parentNode.insertBefore(wrap, img);
    wrap.appendChild(img);

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
    svg.innerHTML = `
      <defs>
        <path id="${id}" d="M ${cx - r},${cy} a ${r},${r} 0 0,1 ${r * 2},0"/>
      </defs>
      <text font-size="24" font-weight="bold" fill="#111" letter-spacing="0.5">
        <textPath href="#${id}" startOffset="50%" text-anchor="middle">${name}</textPath>
      </text>`;

    wrap.appendChild(svg);
  });
}

function alumni() {

}