"use strict";
let forecastDataBase = [];
let searchInput = document.getElementById("locationSearch");
let forecastTable = document.getElementById("forecast");

// Fetch weather data
async function search(location) {
  let http = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=51f60b4d6a6e4568b6f25823241006&q=${location}&days=3`
  );

  let response = await http.json();
  forecastDataBase = response.forecast.forecastday;
  displayCurrent(response), displayFuture();
}

// Search for location
searchInput.addEventListener("keyup", (location) => {
  search(location.target.value);
});

function displayCurrent(currentTemp) {
  if (forecastTable != null) {
    // Reformat the date
    let formattedDate = new Date();
    let currentDate = formattedDate.toLocaleDateString("en-GB", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    // Re-assign directions
    let windDirection = currentTemp.current.wind_dir;
    let fullWindDirection = "";

    switch (windDirection) {
      case "N":
        fullWindDirection = "North";
        break;
      case "NNE":
        fullWindDirection = "North Northeast";
        break;
      case "NE":
        fullWindDirection = "Northeast";
        break;
      case "ENE":
        fullWindDirection = "East Northeast";
        break;
      case "E":
        fullWindDirection = "East";
        break;
      case "ESE":
        fullWindDirection = "East Southeast";
        break;
      case "SE":
        fullWindDirection = "Southeast";
        break;
      case "SSE":
        fullWindDirection = "South Southeast";
        break;
      case "S":
        fullWindDirection = "South";
        break;
      case "SSW":
        fullWindDirection = "South Southwest";
        break;
      case "SW":
        fullWindDirection = "Southwest";
        break;
      case "WSW":
        fullWindDirection = "West Southwest";
        break;
      case "W":
        fullWindDirection = "West";
        break;
      case "WNW":
        fullWindDirection = "West Northwest";
        break;
      case "NW":
        fullWindDirection = "Northwest";
        break;
      case "NNW":
        fullWindDirection = "North Northwest";
        break;
      default:
        fullWindDirection = windDirection;
        break;
    }

    // Display current weather
    let currentCartona = `<div class="forcast-container col-md-4 col-12 mb-3">
                <div class="forcast-header">
                  <p><span>${currentDate.split(" ")[0]}</span><span>${
      currentDate.split(" ")[1]
    } ${currentDate.split(" ")[2]}</span></p>
                </div>
                <div class="forcast-body">
                  <p class="location">${currentTemp.location.name}</p>
                  <div class="d-flex flex-column align-items-center">
                    <p class="temp">${currentTemp.current.temp_c} °C</p>
                    <img
                      class="condition-img w-25"
                      src="https:${currentTemp.current.condition.icon}"
                      alt=""
                    />
                    <p class="condition">${
                      currentTemp.current.condition.text
                    }</p>
                  </div>
                  <div class="forcast-footer">
                    <p><i class="fa-solid fa-umbrella"></i> ${
                      currentTemp.current.humidity
                    } %</p>
                    <p><i class="fa-solid fa-wind"></i> ${
                      currentTemp.current.wind_kph
                    } km/h</p>
                    <p><i class="fa-solid fa-location-arrow"></i> ${fullWindDirection}</p>
                  </div>
                </div>
              </div>`;
    forecastTable.innerHTML = currentCartona;
  }
}

function displayFuture() {
  let futureCartona = "";
  for (let i = 1; i < forecastDataBase.length; i++) {
    // Reformat the date
    let formattedDate = new Date(forecastDataBase[i].date);
    let futureDate = formattedDate.toLocaleDateString("en-GB", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    // Display future weather
    futureCartona += `<div class="forcast-container col-md-4 col-12 mb-3">
                <div class="forcast-header">
                  <p><span>${futureDate.split(" ")[0]}</span><span>${
      futureDate.split(" ")[1]
    } ${futureDate.split(" ")[2]}</p>
                </div>
                <div class="forcast-body">
                  <div class="d-flex flex-column align-items-center">
                    <img
                      class="condition-img w-25"
                      src="https:${forecastDataBase[i].day.condition.icon}"
                      alt=""
                    />
                    <p class="max-temp">${
                      forecastDataBase[i].day.maxtemp_c
                    } °C</p>
                    <p class="min-temp">${
                      forecastDataBase[i].day.mintemp_c
                    } °C</p>
                    <p class="condition">${
                      forecastDataBase[i].day.condition.text
                    }</p>
                  </div>
                </div>
              </div>`;
  }
  forecastTable.innerHTML += futureCartona;
}
// Get current location
function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const location = `${latitude},${longitude}`;
    // console.log(location);
    search(location);
  });
}

if (navigator.geolocation) {
  getCurrentLocation();
}
// search("cairo");
