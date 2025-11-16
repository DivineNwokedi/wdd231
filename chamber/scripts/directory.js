// ✅ 1. Toggle Grid/List View
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

// ✅ 2. Fetch and Display Members
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

// ✅ 3. Dynamic Footer Dates
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// ✅ 4. Mobile Navigation Toggle
const toggleButton = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

toggleButton.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});