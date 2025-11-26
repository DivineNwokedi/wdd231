// Toggle Grid/List View
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const display = document.querySelector("#member-cards");

gridButton.addEventListener("click", () => {
  display.classList.add("grid-view");
  display.classList.remove("list-view");
});

listButton.addEventListener("click", () => {
  display.classList.add("list-view");
  display.classList.remove("grid-view");
});

// Fetch and Display Members
const url = "data/members.json";

async function getMembers() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch members");
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error("Error loading members:", error);
    display.innerHTML = "<p>Unable to load member data.</p>";
  }
}

function displayMembers(members) {
  display.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" />
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <p><a href="${member.website}" target="_blank">Visit Website</a></p>
      <p>Membership Level: ${member.membership}</p>
    `;

    display.appendChild(card);
  });
}

getMembers();

// Dynamic Footer Dates
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Mobile Navigation Toggle
const toggleButton = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

toggleButton.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// === Timestamp Auto-fill for Join Form ===
document.addEventListener("DOMContentLoaded", () => {
  const ts = document.getElementById("timestamp");
  if (ts) {
    ts.value = new Date().toISOString();
  }
});

// === Modal Functionality for Membership Cards ===
const openButtons = document.querySelectorAll(".open-modal");
const closeButtons = document.querySelectorAll(".close-modal");
const modals = document.querySelectorAll(".modal");

openButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const modalId = btn.getAttribute("data-modal");
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "flex"; // show modal
    }
  });
});

closeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    modals.forEach(modal => {
      modal.style.display = "none"; // hide all modals
    });
  });
});

// Close modal when clicking outside of modal content
window.addEventListener("click", (e) => {
  modals.forEach(modal => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});