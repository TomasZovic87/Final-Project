
const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const currentWeather = document.getElementById("currentWeather");
const forecastContainer = document.getElementById("forecastContainer");


const API_KEY = "46d83743831b4653814175843240912";


const getCurrentWeather = async (location) => {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`
    );
    if (!response.ok) throw new Error("Location not found!");
    const data = await response.json();

    currentWeather.innerHTML = `
      <h3>${data.location.name}, ${data.location.country}</h3>
      <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
      <p><strong>Condition:</strong> ${data.current.condition.text}</p>
      <img src="${data.current.condition.icon}" alt="Weather Icon">
      <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.current.wind_kph} kph</p>
    `;
  } catch (error) {
    currentWeather.innerHTML = `<p>${error.message}</p>`;
  }
};

const getForecast = async (location) => {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=5`
    );
    if (!response.ok) throw new Error("Location not found!");
    const data = await response.json();

    forecastContainer.innerHTML = "";
    data.forecast.forecastday.forEach((forecast) => {
      const date = forecast.date;
      const temp = forecast.day.avgtemp_c;
      const condition = forecast.day.condition.text;
      const icon = forecast.day.condition.icon;

      const forecastItem = document.createElement("div");
      forecastItem.classList.add("forecast-item");
      forecastItem.innerHTML = `
        <p><strong>${date}</strong></p>
        <img src="${icon}" alt="Weather Icon">
        <p>${temp}°C</p>
        <p>${condition}</p>
      `;
      forecastContainer.appendChild(forecastItem);
    });
  } catch (error) {
    forecastContainer.innerHTML = `<p>${error.message}</p>`;
  }
};

searchButton.addEventListener("click", () => {
    const location = locationInput.value.trim();
    if (!location) {
      alert("Please enter a location!");
      return;
    }
    
    localStorage.setItem("lastLocation", location);
  
    getCurrentWeather(location);
    getForecast(location);
});
