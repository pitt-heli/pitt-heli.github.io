// Staggered block entrance on the prospects page
const blocks = document.querySelectorAll('.prospects-block');

blocks.forEach((block, i) => {
  setTimeout(() => {
    block.classList.add('visible');
  }, 200 + i * 180);
});
setupNavToggle(); 
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