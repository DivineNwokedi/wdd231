// Import the places data
import { places } from "../data/places.mjs";

// === Visitor Message using localStorage ===
(function showVisitMessage() {
  const key = "discover-last-visit";
  const container = document.getElementById("visit-message");
  if (!container) return;

  const now = Date.now();
  const last = localStorage.getItem(key);

  if (!last) {
    container.textContent = "Welcome! Let us know if you have any questions.";
    localStorage.setItem(key, String(now));
    return;
  }

  const diffMs = now - Number(last);
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    container.textContent = "Back so soon! Awesome!";
  } else {
    const unit = diffDays === 1 ? "day" : "days";
    container.textContent = `You last visited ${diffDays} ${unit} ago.`;
  }

  localStorage.setItem(key, String(now));
})();

// === Render Discover Cards ===
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("directory-grid"); // match your HTML id
  if (!grid) {
    console.error("Grid element not found");
    return;
  }

  const areaClasses = ["item-a","item-b","item-c","item-d","item-e","item-f","item-g","item-h"];

  places.forEach((place, idx) => {
    const card = document.createElement("article");
    card.className = `card ${areaClasses[idx] || ""}`;

    card.innerHTML = `
      <h2>${place.title}</h2>
      <figure>
        <img src="${place.image}" alt="${place.title}" loading="lazy" />
      </figure>
      <address>${place.address}</address>
      <p>${place.description}</p>
      <div class="actions">
        <a href="#" class="btn" role="button">Learn more</a>
      </div>
    `;

    grid.appendChild(card);
  });
});

// === Footer Dates ===
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// === Mobile Navigation Toggle ===
const toggleButton = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
if (toggleButton && navMenu) {
  toggleButton.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
}