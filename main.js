const apiKey = "cf73d38d029b5b594a52f8399a2f992f";

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod === 200) {
      updateWeatherUI(data);
    } else {
      alert("City not found!");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (city) {
    fetchWeather(city);
  }
}

function updateWeatherUI(data) {
  const display = document.getElementById("weatherDisplay");
  const humidity = data.main.humidity;
  const pressure = data.main.pressure;
  const windSpeed = data.wind.speed;
  const visibility = (data.visibility / 1000).toFixed(1);
  const feelsLike = data.main.feels_like;
  const temperature = data.main.temp;
  const condition = data.weather[0].description;
  const city = data.name;
  const country = data.sys.country;
  const icon = data.weather[0].icon;

  display.innerHTML = `
    <div class="weather-card">
      <h2><i class="fas fa-map-marker-alt"></i> ${city}, ${country}</h2>
      <p>${condition.charAt(0).toUpperCase() + condition.slice(1)}</p>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon" />
      <h1>${temperature}°C</h1>
      <p>Feels like ${feelsLike}°C</p>
      <div class="stats-grid">
        <div class="stat-box"><i class="fas fa-tint"></i> Humidity: <strong>${humidity}%</strong></div>
        <div class="stat-box"><i class="fas fa-wind"></i> Wind Speed: <strong>${windSpeed} m/s</strong></div>
        <div class="stat-box"><i class="fas fa-thermometer-half"></i> Pressure: <strong>${pressure} hPa</strong></div>
        <div class="stat-box"><i class="fas fa-eye"></i> Visibility: <strong>${visibility} km</strong></div>
      </div>
    </div>
  `;
  display.style.display = "block";
}

document.getElementById("toggleMode").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
