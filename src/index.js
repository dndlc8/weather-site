//Date and Time Header
let now = new Date();
let hours = now.getHours();
let minutes = ("0" + now.getMinutes()).slice(-2);
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let todayDay = days[now.getDay()];
let todayDate = now.getDate();
let year = now.getFullYear();

let h2 = document.querySelector("h2");
h2.innerHTML =
  `${todayDay} ${month} ${todayDate}, ${year}` + "<br>" + `${hours}:${minutes}`;
let h3 = document.querySelector("h3");
h3.innerHTML = null;

//Background Change
let header = document.querySelector("#header");

if (((hours > 6) && (hours < 8)) || ((hours > 18) && (hours < 21))) {
  document.body.classList.add("morning-background");
  (header).classList.add("morning-header");
} else if ((hours >= 21) || (hours <=6 )) {
  document.body.classList.add("night-background");
  (header).classList.add("night-header");
} else {
  document.body.classList.add("day-background");
  (header).classList.add("day-header");
}


function bigWeatherIcon(response) {
  let mainWeatherDescription = response.data.data[0].weather.code;
  let mainWeatherIcon = getWeatherIcon(mainWeatherDescription);
  document.getElementById('main-image').src = mainWeatherIcon;
}

function displayForecast(response) {
  let forecastElement = document.querySelector(".weekly");
  forecastElement.innerHTML = null;

  if (response.statusText === 'No Content') {
    return forecastElement.innerHTML = null;
  }


  for (let i = 1; i < 8; i++) {
    let weatherDescripNum = response.data.data[i].weather.code;
    let weatherIcon = getWeatherIcon(weatherDescripNum);
    forecastElement.innerHTML += `<div class="row">
            <img
            class="weekly-symbols figure-img col-2"
            src="${weatherIcon}"
          />
          <div class="day col">
            <span class="day-name"></span> <br /><span class="description"
              >${response.data.data[i].weather.description}</span
            >
          </div>
          <div class="hi col"><span class="hi-temp">${Math.round(
      response.data.data[i].max_temp
    )}</span>°F</div>
          <div class="low col"><span class="low-temp">${Math.round(
      response.data.data[i].min_temp
    )}</span>°F</div>
          <div class="descSm">${response.data.data[i].weather.description}</div>
        </div>`;
  }
  const week = document.querySelectorAll(".day-name");
  const currentDay = now.getDay();

  for (let weekDay = 0; weekDay < week.length; weekDay++) {
    const dayOfTheWeek = days[(weekDay + currentDay + 1) % 7]
    week[weekDay].innerHTML = dayOfTheWeek;
  }
}

//Current Temps
function searchNow(event) {
  let h1 = document.querySelector("h1");

  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let units = "imperial";
    let apiKey = "1b9a19801a7a96280358cc2498e9820b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showTemp);

    function showTemp(response) {
      let currentCity = response.data.name;
      h1.innerHTML = `${currentCity}`;

      let temp = Math.round(response.data.main.temp);
      let currentTemp = document.querySelector(".temp");
      currentTemp.innerHTML = temp;

      let hiTemp = Math.round(response.data.main.temp_max);
      let celsHiTemp = Math.round(((hiTemp - 32) * 5) / 9);
      let hi = document.querySelector(".current-hi");
      hi.innerHTML = `${hiTemp}°F/${celsHiTemp}°C`;

      let lowTemp = Math.round(response.data.main.temp_min);
      let celsLowTemp = Math.round(((lowTemp - 32) * 5) / 9);
      let low = document.querySelector(".current-low");
      low.innerHTML = `${lowTemp}°F/${celsLowTemp}°C`;

      let humidityTemp = response.data.main.humidity;
      let humidity = document.querySelector(".current-humidity");
      humidity.innerHTML = humidityTemp;

      let windSpeed = response.data.wind.speed;
      let wind = document.querySelector(".wind-speed");
      wind.innerHTML = windSpeed;

      function formatDate(timestamp) {
        let date = new Date(timestamp);
        let dateNumber = date.getDate();
        let year = date.getFullYear();
        let hour = date.getHours();
        if (hour < 10) {
          hour = `0${hour}`;
        }
        let minute = date.getMinutes();
        if (minute < 10) {
          minute = `0${minute}`;
        }
        let days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        let day = days[date.getDay()];

        let months = [
          "Jan",
          "Feb",
          "March",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        let month = months[now.getMonth()];
        return `${day} ${month} ${dateNumber}, ${year} ${hour}:${minute}`;
      }

      function faren(event) {
        event.preventDefault(event);
        let currentTemp = document.querySelector(".temp");
        currentTemp.innerHTML = temp;
      }
      let farenheit = document.querySelector(".farenheit");
      farenheit.addEventListener("click", faren);

      function cels(event) {
        event.preventDefault();
        let currentTemp = document.querySelector(".temp");
        let celsTemp = Math.round(((temp - 32) * 5) / 9);
        currentTemp.innerHTML = celsTemp;
      }
      let celsius = document.querySelector(".celsius");
      celsius.addEventListener("click", cels);
    }
  }
  navigator.geolocation.getCurrentPosition(showPosition);

  function forecastLocation(position) {
    let lats = position.coords.latitude;
    let long = position.coords.longitude;
    let bitApiKey = "01370f63653348adb1ecfc0286f47af9";
    let bitApiUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lats}&lon=${long}&key=${bitApiKey}&units=I&tp=daily`;

    axios.get(bitApiUrl).then(displayForecast);
    axios.get(bitApiUrl).then(bigWeatherIcon);
  }
  navigator.geolocation.getCurrentPosition(forecastLocation);
}
let currentButton = document.querySelector(".btn-info");
currentButton.addEventListener("click", searchNow);

//Search Temps
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search-text-input");
  let h2City = document.querySelector(".city-name");
  h2City.innerHTML = `${searchInput.value}:`;

  let city = document.querySelector("#city-search-text-input");
  let units = "imperial";
  let apiKey = "1b9a19801a7a96280358cc2498e9820b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${units}`;

  function searchTemp(response) {
    let temp = Math.round(response.data.main.temp);
    let currentTemp = document.querySelector(".temp");
    currentTemp.innerHTML = temp;

    let hiTemp = Math.round(response.data.main.temp_max);
    let celsHiTemp = Math.round(((hiTemp - 32) * 5) / 9);
    let hi = document.querySelector(".current-hi");
    hi.innerHTML = `${hiTemp}°F/${celsHiTemp}°C`;

    let lowTemp = Math.round(response.data.main.temp_min);
    let celsLowTemp = Math.round(((lowTemp - 32) * 5) / 9);
    let low = document.querySelector(".current-low");
    low.innerHTML = `${lowTemp}°F/${celsLowTemp}°C`;

    let humidityTemp = response.data.main.humidity;
    let humidity = document.querySelector(".current-humidity");
    humidity.innerHTML = humidityTemp;

    let windSpeed = response.data.wind.speed;
    let wind = document.querySelector(".wind-speed");
    wind.innerHTML = windSpeed;

    function faren(event) {
      event.preventDefault(event);
      let currentTemp = document.querySelector(".temp");
      currentTemp.innerHTML = temp;
    }
    let farenheit = document.querySelector(".farenheit");
    farenheit.addEventListener("click", faren);

    function cels(event) {
      event.preventDefault();
      let currentTemp = document.querySelector(".temp");
      let celsTemp = Math.round(((temp - 32) * 5) / 9);
      currentTemp.innerHTML = celsTemp;
    }
    let celsius = document.querySelector(".celsius");
    celsius.addEventListener("click", cels);
  }
  axios.get(apiUrl).then(searchTemp);
}
let searchButton = document.querySelector(".btn-primary");
searchButton.addEventListener("click", searchCity);

function forecastSearchLoc(event) {
  event.preventDefault();
  let town = (document.querySelector("#city-search-text-input")).value;
  let code = (document.querySelector("#country-search-text-input")).value;
  let bitApiKey = "01370f63653348adb1ecfc0286f47af9";
  let bitApiUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${town}&country=${code}&key=${bitApiKey}&units=I&tp=daily`;

  axios.get(bitApiUrl).then(displayForecast);
  axios.get(bitApiUrl).then(bigWeatherIcon);
  axios.get(bitApiUrl).then(cityDate);

  function cityDate(response) {
    let timezone = response.data.timezone;
    let DateTime = luxon.DateTime;
    let searchMonth = DateTime.fromObject({ zone: timezone }).monthLong;
    let searchDateNumb = DateTime.fromObject({ zone: timezone }).day;
    let searchYear = DateTime.fromObject({ zone: timezone }).year;
    let searchHour = DateTime.fromObject({ zone: timezone }).hour;
    let searchMinutes = DateTime.fromObject({ zone: timezone }).minute;
    h3.innerHTML = `${searchMonth} ${searchDateNumb}, ${searchYear} ${searchHour}:${searchMinutes}`
  }
}
let searchForecastButton = document.querySelector(".btn-primary");
searchForecastButton.addEventListener("click", forecastSearchLoc);
