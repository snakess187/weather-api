const searchForm = document.getElementById("search-form");
const searchHistory = document.getElementById("search-history");

// when the user submits the ofrm , the event listners call back function is triggered
searchForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const city = document.getElementById("city").value;
  searchWeather(city);
});
// when the users click on an item in the search history the event listners function is tirggered, if checks if one is a list item, if it is a list item it will call the weather from that city 
searchHistory.addEventListener("click", function(event) {
  if (event.target.tagName === "LI") {
    searchWeather(event.target.textContent);
  }
});


// this function fetches with current weather data for the slected city using open weather map api , upadtes the search history 
function searchWeather(city) {
  const apiKey = "a0fa0f2ff879774a93804b280cb886b1";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      addToSearchHistory(city);
      displayCurrentWeather(data);
      getForecast(data.coord.lat, data.coord.lon);
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
    });
}


// adds data to search history
function addToSearchHistory(city) {
  const li = document.createElement("li");
  li.textContent = city;
  searchHistory.appendChild(li);
}
//  updates current weather element on the webpage with the provided weath data and shows city name, date, temp , humuditity and wind speed 
function displayCurrentWeather(data) {
  const currentWeather = document.getElementById("current-weather");
  currentWeather.innerHTML = `
  <h3>${data.name} (${new Date().toLocaleDateString()})</h3>
  <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
  <p>Temperature: ${data.main.temp}°C</p>
  <p>Humidity: ${data.main.humidity}%</p>
  <p>Wind Speed: ${data.wind.speed} m/s</p>
`;
}
// this fat get the latitude and logitude from the weather api. it calls display forcast data function to display forcast 
function getForecast(lat, lon) {
const apiKey = "a0fa0f2ff879774a93804b280cb886b1";
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    displayForecast(data);
  })
  .catch(error => {
    console.error("Error fetching forecast data:", error);
  });
}
// updates forcast elment on the wepage, creates a new div elment for each weather day and appends the div elemtn to the forcast on the page
function displayForecast(data) {
const forecast = document.getElementById("forecast");
forecast.innerHTML = '';

for (let i = 0; i < data.list.length; i += 8) {
  const day = data.list[i];
  const dayElement = document.createElement("div");
  dayElement.innerHTML = `
    <h4>${new Date(day.dt * 1000).toLocaleDateString()}</h4>
    <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
    <p>Temperature: ${day.main.temp}°C</p>
    <p>Wind Speed: ${day.wind.speed} m/s</p>
    <p>Humidity: ${day.main.humidity}%</p>
  `;
  forecast.appendChild(dayElement);
}
}
// a tester array of names to draw on before my api was setup 
const cityNames = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose"
  ];
  
  const citiesDatalist = document.getElementById("cities");
  
  cityNames.forEach((cityName) => {
    const option = document.createElement("option");
    option.value = cityName;
    citiesDatalist.appendChild(option);
  });
  
