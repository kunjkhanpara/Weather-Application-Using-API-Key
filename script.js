document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('get-weather-btn').addEventListener('click', getWeather);
  document.getElementById('location-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      getWeather();
    }
  });
});

function getWeather() {
  const location = document.getElementById('location-input').value;
  const weatherInfo = document.getElementById('weather-info');

  if (!location) {
    weatherInfo.innerHTML = '<p>Please enter a city.</p>';
    return;
  }

  const apiKey = '17a238050fd2828e703a8fc9293c4a01';
  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${location}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        weatherInfo.innerHTML = `
          <p>City not found. Please try again.</p>
          <p>If the issue persists, please email <a href="mailto:kunjwhatsapp@gmail.com">kunjwhatsapp@gmail.com</a> so I can update the API key.</p>
        `;
        return;
      }
      
      const weather = data.current;
      weatherInfo.innerHTML = `
        <h3>${data.location.name}, ${data.location.country}</h3>
        <p>Weather: ${weather.weather_descriptions[0]}</p>
        <p>Temperature: ${weather.temperature}°C</p>
        <p>Humidity: ${weather.humidity}%</p>
        <p>Wind Speed: ${weather.wind_speed} km/h</p>
      `;
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      weatherInfo.innerHTML = `
        <p>Failed to retrieve weather data. Please try again later.</p>
        <p>If the issue persists, please email <a href="mailto:kunjwhatsapp@gmail.com">kunjwhatsapp@gmail.com</a> so I can update the API key.</p>
      `;
    });
}
