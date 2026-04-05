document.addEventListener("DOMContentLoaded", setupPublications);

async function setupPublications() {
  const container = document.getElementById("pubList");
  if (!container) return;

  const response = await fetch("./static/data/publications.json");
  const publications = await response.json();

  renderPublications(publications, container);
  animateCards();
}

function renderPublications(publications, container) {
  container.innerHTML = "";

  publications.forEach(function (pub) {
    var card = document.createElement("div");
    card.className = "pub-card";

    var text = document.createElement("p");
    text.className = "pub-text";
    text.innerHTML =
      pub.authors + " (" + pub.year + "). " + pub.title + " <em>" + pub.source + "</em>";

    var link = document.createElement("a");
    link.className = "pub-link";
    link.href = pub.link;
    link.textContent = "View";

    card.appendChild(text);
    card.appendChild(link);
    container.appendChild(card);
  });
}

function animateCards() {
  var cards = document.querySelectorAll(".pub-card");
  cards.forEach(function (card, i) {
    setTimeout(function () {
      card.classList.add("visible");
    }, 300 + i * 160);
  });
}