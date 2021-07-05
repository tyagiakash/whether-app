const inputField = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const whetherContainer = document.querySelector(".container");
const loading = document.querySelector(".loading");
const error = document.querySelector(".error");
const temperature = document.querySelector(".temp");
const summary = document.querySelector(".summary");
const loc = document.querySelector(".location");
const icon = document.querySelector(".icon");
const kelvin = 273;

const api = "0c073aad5384ea5e9cfa1ebaf6613cc9";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  loading.style.display = "block";
  whetherContainer.style.display = "none";
  error.style.display = "none";
  const inputValue = inputField.value;

  let endPoint;

  if (!isNaN(inputValue) && inputValue.length == 6) {
    endPoint = baseUrl + `zip=${inputValue},in&appid=${api}`;
  } else {
    endPoint = baseUrl + `q=${inputValue}&appid=${api}`;
  }

  fetch(endPoint)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.cod === "404") {
        error.innerHTML = data.message;
        error.style.display = "block";
        return;
      }
      
      temperature.textContent = Math.floor(data.main.temp - kelvin) + "°C";
      summary.textContent = data.weather[0].description;
      loc.textContent = data.name + "," + data.sys.country;
      let icon1 = data.weather[0].icon;
      icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon1}@2x.png" style= 'height:10rem'/>`;
      loading.style.display = "none";
      whetherContainer.style.display = "block";
    })
    .catch((err) => {
      loading.style.display = "none";
      whetherContainer.style.display = "none";
    });
});
