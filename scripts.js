async function getWeather(location = null) {
  if (!location) {
    location = document.getElementById('location').value;
  }
  if (!location) {
    alert("Please enter a location or use your current location");
    return;
  }
  const apiKey = 'b419ef4a015f4d55861114243251303';
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    document.getElementById('weather-info').innerHTML = `
      <h3>${data.location.name}, ${data.location.country}</h3>
      <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
      <p><strong>Condition:</strong> ${data.current.condition.text}</p>
      <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.current.wind_kph} kph</p>
      <img src="${data.current.condition.icon}" alt="Weather Icon">
    `;
  } catch (error) {
    alert("Unable to fetch weather data. Please check your input.");
  }
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeather(`${lat},${lon}`);
    }, error => {
      alert("Geolocation is not enabled or permission denied.");
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
