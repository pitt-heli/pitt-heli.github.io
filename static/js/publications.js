// Staggered card entrance animation
const cards = document.querySelectorAll('.pub-card');
 
cards.forEach((card, i) => {
  setTimeout(() => {
    card.classList.add('visible');
  }, 300 + i * 160);
});
 