// Search event city weather
function search(event) {
    event.preventDefault();
    let city = document.querySelector("#enter-city");

    searchCity(city.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

searchCity("Antwerp");

function cityWeather(response) {
    let city = document.querySelector("#city");
    city.innerHTML = response.data.name;
}

// Displaying 5 day weather forecast

function displayFiveDayForecast(response) {
    let forecastReport = document.querySelector("#forecast-report");
    forecastReport.innerHTML = null;
    let forecast = null;

    for (let index = 0; index < 6; index++) {
        forecast = response.data.list[index];
        forecastReport.innerHTML += `<div class ="col-2>
<h3>`
    }
}


// Get axios
function searchCity(city) {
    let apiKey = "7f2644b98089db65deba1530820c54a1";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(cityWeather);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayFiveDayForecast);

}

