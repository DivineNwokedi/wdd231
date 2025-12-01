// scripts/main.js
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('plantCards');
  const modal = document.getElementById('plantModal');
  const modalBody = document.getElementById('modalBody');
  const closeModal = document.getElementById('closeModal');

  // Hamburger toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  // Scroll helper
  window.scrollToSection = function (id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch plants.json
  async function loadPlants() {
    try {
      const response = await fetch('data/plants.json');
      if (!response.ok) throw new Error('Network error');
      const plants = await response.json();

      // Render cards dynamically
      plants.forEach(plant => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <img src="${plant.image}" alt="${plant.name}" loading="lazy">
          <h3>${plant.name}</h3>
          <p>Type: ${plant.type}</p>
          <p>Watering: ${plant.watering}</p>
          <button class="details-btn">Details</button>
        `;
        container.appendChild(card);

        // Modal interaction
        card.querySelector('.details-btn').addEventListener('click', () => {
          modalBody.textContent = `${plant.name} is a ${plant.type} plant. Watering needs: ${plant.watering}.`;
          modal.classList.add('show');
        });
      });
    } catch (err) {
      console.error('Error loading plants:', err);
    }
  }

  loadPlants();

  // Close modal
  closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
  });

  // Local Storage Theme Toggle
  const themeToggle = document.createElement('button');
  themeToggle.textContent = 'Toggle Dark Mode';
  themeToggle.style.marginTop = '1rem';
  document.querySelector('footer').appendChild(themeToggle);

  // Load saved theme
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
  });
});
