// ✅ Mobile Navigation Toggle
const toggleButton = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

toggleButton.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// ✅ Dynamic Footer Dates
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// ✅ Weather Section (OpenWeatherMap API)
const weatherTemp = document.getElementById("weather-temp");
const weatherDesc = document.getElementById("weather-desc");
const forecastList = document.getElementById("forecast-list");

// Replace with your actual OpenWeatherMap API key and chamber location
const apiKey = "abc123def456ghi789";
const city = "Warri";
const units = "imperial";

async function getWeather() {
  try {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;

    const [weatherRes, forecastRes] = await Promise.all([
      fetch(weatherURL),
      fetch(forecastURL)
    ]);

    const weatherData = await weatherRes.json();
    const forecastData = await forecastRes.json();

    weatherTemp.textContent = `Temperature: ${Math.round(weatherData.main.temp)}°F`;
    weatherDesc.textContent = `Conditions: ${weatherData.weather[0].description}`;

    forecastList.innerHTML = "";
    const dailyForecasts = forecastData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
    dailyForecasts.forEach(day => {
      const date = new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "long" });
      const temp = Math.round(day.main.temp);
      const li = document.createElement("li");
      li.textContent = `${date}: ${temp}°F`;
      forecastList.appendChild(li);
    });
  } catch (error) {
    weatherTemp.textContent = "Unable to load weather data.";
    console.error("Weather error:", error);
  }
}

getWeather();

// ✅ Spotlight Section
const spotlightContainer = document.getElementById("spotlight-container");

async function getSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();
    const goldSilver = data.members.filter(m => m.membership === "Gold" || m.membership === "Silver");

    const shuffled = goldSilver.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    spotlightContainer.innerHTML = "";
    selected.forEach(member => {
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

      spotlightContainer.appendChild(card);
    });
  } catch (error) {
    spotlightContainer.innerHTML = "<p>Unable to load spotlight members.</p>";
    console.error("Spotlight error:", error);
  }
}

getSpotlights();