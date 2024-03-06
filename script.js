const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".btn");
const weatherIcon = document.querySelector(".weatherimage");

const apiKey = "&appid=763d92cee43b1b07199d00b52e59ce32";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

searchBtn.addEventListener("click", () => {
  weather(searchBox.value);
});

async function weather(city) {
  const response = await fetch(apiUrl + city + apiKey);
  const data = await response.json();
  console.log(data);
  if (data.cod != 404) {
    document.querySelector(".error").innerHTML = "";
    document.querySelector(".temprature").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".cityname").innerHTML = data.name;
    document.querySelector(".weatherdetail h2").innerHTML =
      data.weather[0].main;
    document.querySelector(".weatherdetail p").innerHTML =
      data.weather[0].description;
    document.querySelector(".feels").innerHTML =
      "feels like " + Math.round(data.main.feels_like) + "°";
    document.querySelector(".country").innerHTML =
      "Country-" + data.sys.country;
    document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".windspeed").innerHTML =
      Math.round(3.6 * data.wind.speed) + " km/hr";
    let weather = data.weather[0].main;

    if (weather == "Clear") {
      weatherIcon.src = "./imgs/sun.png";
    } else if (weather == "Rain") {
      weatherIcon.src = "./imgs/rain.png";
    } else if (weather == "Clouds") {
      weatherIcon.src = "./imgs/cloudy.png";
    } else if (weather == "Drizzle") {
      weatherIcon.src = "./imgs/fog.png";
    } else if (weather == "Mist" || weather == "Haze") {
      weatherIcon.src = "./imgs/fog.png";
    }
    document.querySelector(".weather").style.display = "block";
  } else {
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").innerHTML = "City Not Found";
  }
}
