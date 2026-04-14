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

}