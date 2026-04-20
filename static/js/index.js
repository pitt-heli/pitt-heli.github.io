document.addEventListener("DOMContentLoaded", setup);

// Setup function that is called after the Document Object Model is loaded
function setup() {

  // Fade-in for homepage elements
  const elements = document.querySelectorAll('#home-title, #homepage-main, #homepage-belowBox');

  elements.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 200 + i * 180);
  });

  // Show the body once everything is ready
  document.body.style.visibility = 'visible';

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