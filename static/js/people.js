window.addEventListener("load", setup);


function setup() {
    investigator(); 
    student(); 
}


function investigator(){
    const card = document.querySelector('#raquel-section');
    if (!card) return;

    const h3 = card.querySelector('h3.person-name');
    const img = card.querySelector('img.headshots');
    if (!h3 || !img) return;

    const name = h3.textContent.trim();
    const size = img.offsetWidth || 160;
    const r = size / 2 + 10;
    const cx = size / 2;
    const cy = size / 2;
    const id = `arc-raquel`;

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
      <text font-size="104" font-weight="bold" fill="#111" letter-spacing="0.5">
        <textPath href="#${id}" startOffset="50%" text-anchor="middle">${name}</textPath>
      </text>`;

    wrap.appendChild(svg);
}

function student() {
    document.querySelectorAll('.student').forEach((card, i) => {
        const h3 = card.querySelector('h3.person-name');
        const img = card.querySelector('img.headshots');
        if (!h3 || !img) return;

        const name = h3.textContent.trim();
        const size = img.offsetWidth || 160;
        const r = size / 2 +10;
        const cx = size / 2;
        const cy = size / 2;
        const id = `arc-${i}`;

        // Wrap the image in a relative container
        const wrap = document.createElement('div');
        wrap.className = 'headshot-wrap';
        img.parentNode.insertBefore(wrap, img);
        wrap.appendChild(img);

        // Build the SVG arc
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

function alumni(){

}