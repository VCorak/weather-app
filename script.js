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


    let lon = response.coord.lon;
    let lat = response.coord.lat;
    const forecastData = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={current,minutely,hourly,alerts}&appid=21d207d4e5449385a0586090096515c7`);
    const res = await forecastData.json();

    console.log(res);


    let forecastElement = document.querySelector("#forecast-report");
    forecastElement.innerHTML = null;
    let forecast = null;

    for (let index = 0; index < 6; index++) {
        forecast = res.daily[index];
        console.log(forecast);
        let date = new Date(forecast.dt * 1000);
        let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
        let name = days[date.getDay()];
        forecastElement.innerHTML += `<div class="col-2">
              <h3>
                ${name}
              </h3>
              <img
                src="http://openweathermap.org/img/wn/${
            response.weather[0].icon
        }@2x.png"
                alt=""
              />
              <div class="hourly-forecast-temperature">
                <strong>${Math.round(
            forecast.temp.day
        )}°</strong> 
              </div>
        </div>`;


    }
}

button.addEventListener('click', () => getCity(input.value));








