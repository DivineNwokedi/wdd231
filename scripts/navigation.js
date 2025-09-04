const hamburgerBtn = document.getElementById("hamburgerBtn");
const nav = document.getElementById("primaryNav");

hamburgerBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});
