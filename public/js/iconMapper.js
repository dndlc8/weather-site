
function getWeatherIcon(weatherCode) {
  switch (weatherCode) {
    case 200:
    case 201:
    case 202:
    case 230:
    case 231:
    case 232:
    case 233:
      return "/weather_images/weather symbols/thunder.png";
    case 300:
    case 301:
    case 302:
    case 500:
    case 520:
    case 522:
      return "/weather_images/weather symbols/showers.png";
    case 501:
    case 502:
    case 511:
      return "/weather_images/weather symbols/heavy_rain.png";
    case 600:
    case 601:
    case 602:
    case 610:
    case 611:
    case 612:
    case 621:
    case 622:
    case 623:
      return "/weather_images/weather symbols/snowy.png";
    case 700:
    case 711:
    case 721:
    case 801:
    case 802:
    case 803:
    case 804:
      return "/weather_images/weather symbols/sunny_to_cloudy.png";
    case 800:
      return "/weather_images/weather symbols/sunny.png";
    case 521:
      return "/weather_images/weather symbols/sun_rain.png";
    default:
      return null;
  }

}
