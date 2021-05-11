const input = document.getElementById('enter-city');
const button = document.getElementById('run');

const getCity = async city => {
    const url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=21d207d4e5449385a0586090096515c7&units=metric`);
    const response = await url.json();

    console.log(response);


    document.getElementById("city").innerHTML = response.name;
    //document.getElementById("date").innerHTML = formatDate(response.dt * 1000);//
    document.getElementById("main-temp").innerHTML = Math.round(response.main.temp);
    document.getElementById("description").innerHTML = response.weather[0].description;
    document.getElementById("humidity").innerHTML = `Humidity: ${response.main.humidity} %`;
    document.getElementById("wind").innerHTML = `Wind: ${response.wind.speed} km/h`;
    document.getElementById("weather-icon").setAttribute("src",
        `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);



   /* const lat = response.coords.lat;
    const lon = response.coords.lon;
    const forecast = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    const forecastResponse = await forecast.json();

    document.getElementById("forecast-report").innerHTML = forecastResponse.list[index];
*/
}

button.addEventListener('click', () => getCity(input.value));







