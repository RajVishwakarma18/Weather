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
  display.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon" />
    <h3>${data.main.temp}°C</h3>
    <p>${data.weather[0].description}</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
  `;
  display.style.display = "block";
}