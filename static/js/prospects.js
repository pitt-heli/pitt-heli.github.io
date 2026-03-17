// Staggered block entrance on the prospects page
const blocks = document.querySelectorAll('.prospects-block');

blocks.forEach((block, i) => {
  setTimeout(() => {
    block.classList.add('visible');
  }, 200 + i * 180);
});