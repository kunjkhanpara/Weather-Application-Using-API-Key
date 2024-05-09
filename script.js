document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('get-weather-btn').addEventListener('click', getWeather);
    document.getElementById('location-input').addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        getWeather();
      }
    });
  });
  
  function getWeather() {
    const location = document.getElementById('location-input').value;
    const apiKey = 'c3849937d662f21b820d63160598cdcb';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const weatherInfo = document.getElementById('weather-info');
        const windSpeedKmh = data.wind.speed * 3.6; 
        weatherInfo.innerHTML = `
          <h3>${data.name}, ${data.sys.country}</h3>
          <p>Weather: ${data.weather[0].main}</p>
          <p>Description: ${data.weather[0].description}</p>
          <p>Temperature: ${data.main.temp}°C</p>
          <p>Humidity: ${data.main.humidity}%</p>
          <p>Wind Speed: ${windSpeedKmh.toFixed(2)} km/h</p> <!-- Display wind speed in km/h -->
        `;
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }
  