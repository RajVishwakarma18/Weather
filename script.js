const apiKey = "YOUR_API_KEY_HERE";
document.getElementById("darkToggle").addEventListener("change", function () {
  document.body.classList.toggle("dark");
  document.getElementById("weatherDisplay").classList.toggle("dark");
});
async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const loader = document.getElementById("loader");
  const display = document.getElementById("weatherDisplay");
  if (!city) return alert("Enter a city name.");
  loader.classList.remove("hidden");
  display.classList.add("hidden");
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await res.json();
    if (data.cod !== 200) throw new Error(data.message);
    const html = `
      <h2><i class="fas fa-map-marker-alt"></i> ${data.name}, ${data.sys.country}</h2>
      <p class="weather-main">${data.weather[0].description}</p>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
      <div class="temp">${Math.round(data.main.temp)}°C</div>
      <p>Feels like ${Math.round(data.main.feels_like)}°C</p>
      <div class="stats-grid">
        <div class="stat-box"><i class="fas fa-tint"></i> Humidity: <span>${data.main.humidity}%</span></div>
        <div class="stat-box"><i class="fas fa-wind"></i> Wind Speed: <span>${data.wind.speed} m/s</span></div>
        <div class="stat-box"><i class="fas fa-thermometer-half"></i> Pressure: <span>${data.main.pressure} hPa</span></div>
        <div class="stat-box"><i class="fas fa-eye"></i> Visibility: <span>${(data.visibility / 1000).toFixed(1)} km</span></div>
      </div>`;
    display.innerHTML = html;
    display.classList.remove("hidden");
  } catch (err) {
    alert("Error: " + err.message);
  } finally {
    loader.classList.add("hidden");
  }
}
