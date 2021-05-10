// Search event city weather
function search(event) {
    event.preventDefault();
    let city = document.querySelector("#enter-city");

    searchCity(city.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

searchCity("Antwerp");

// Display responses in html
function cityWeather(response) {
    let city = document.querySelector("#city");
    city.innerHTML = response.data.name;
    let temperature = document.querySelector("#main-temp");
    temperature.innerHTML = Math.round(response.data.main.temp);
    let description = document.querySelector("#description");
    description.innerHTML = response.data.weather[0].description;
    let mainIcon = document.querySelector("#weather-icon");
    mainIcon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    mainIcon.setAttribute("alt", response.data.weather[0].description);

}

// Displaying 5 day weather forecast
function displayFiveDaysForecast(response) {
    let forecastData = document.querySelector("#forecast-report");
    forecastData.innerHTML = null;
    let forecast = null;

    for (let index = 0; index < 5; index++) {
        forecast = response.data.list[index];
        forecastData.innerHTMl += `<div class="col-2">
              <img
                src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
        }@2x.png"
                alt=""
              />
              <div class="hourly-forecast-temperature">
                <strong>${Math.round(
            forecast.main.temp_max
        )}°</strong> ${Math.round(forecast.main.temp_min)}°
              </div>
        </div>`;
    }
}



// Get axios
function searchCity(city) {
    let apiKey = "7f2644b98089db65deba1530820c54a1";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(cityWeather);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayFiveDaysForecast);

}


