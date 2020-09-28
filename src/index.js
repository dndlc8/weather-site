//import "./styles.css";

//Date and Time Header
let now = new Date();
let hours = now.getHours();
let minutes = ("0" + now.getMinutes()).slice(-2);
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
let day = days[now.getDay()];
let date = now.getDate();
let year = now.getFullYear();

let h2 = document.querySelector("h2");
h2.innerHTML =
  `${day} ${month}/${date}/${year}` + "<br>" + `${hours}:${minutes}`;

//Los Angeles Temps

let lat = 34.052;
let lon = -118.244;
let units = "imperial";
let apiKey = "1b9a19801a7a96280358cc2498e9820b";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(losAngTemp);

function losAngTemp(response) {
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
    celsTemp = Math.round(((temp - 32) * 5) / 9);
    currentTemp.innerHTML = celsTemp;
  }
  let celsius = document.querySelector(".celsius");
  celsius.addEventListener("click", cels);
}

//Current Temps

function searchNow(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  h1.innerHTML = `Currently, Where You Are`;

  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let units = "imperial";
    let apiKey = "1b9a19801a7a96280358cc2498e9820b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showTemp);

    function showTemp(response) {
      console.log(response.data);
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
}
let currentButton = document.querySelector(".btn-info");
currentButton.addEventListener("click", searchNow);

//Search Temps
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;

  let city = document.querySelector("#search-text-input");
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

//5 day
/*function searchForecast(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input");
  let units = "imperial";
  let apiKey = "1b9a19801a7a96280358cc2498e9820b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&appid=${apiKey}&units=${units}`;

  function weeklyForecast(response) {
    console.log(response.data.list);
    $.ajax({
      url: apiUrl,
      type: "GET",
      data: {
        q: city,
        unit: imperial,
        date: dt_txt,
        min: temp_min,
        max: temp_max,
      },
      console.log(ajax);
    });
  }
  axios.get(apiUrl).then(weeklyForecast);
}
let searchButtonForecast = document.querySelector(".btn-primary");
searchButtonForecast.addEventListener("click", searchForecast);
*/
//Math.min() Math.max()
