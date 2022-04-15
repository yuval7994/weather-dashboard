async function getWeatherInfo(longitude, latitude) {
    const apiweatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=722979637d7f44411802fb9c1783e210&units=imperial`;
    const result = await fetch(apiweatherUrl).then(response => response.json())
    return result
}

async function getCityLocation(city) {
    const apiGeoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=722979637d7f44411802fb9c1783e210`
    const response = await fetch(apiGeoURL).then(response => response.json()) // Array of cities
    const cityData = response[0] // The first item of the array is gonna be the city
    const result = { longitude: cityData.lon, latitude: cityData.lat, name: cityData.name, state: cityData.state, country: cityData.country }
    return result
}

async function handleSearch() {
    // 1 - Grab the value from the search input and save it to a variable
    const textInput = document.getElementById("searchInput").value
    // 2 - Get the longitude and latitude of the searched city
    const cityLocation = await getCityLocation(textInput)
    // 3 - Call the getWeatherInfo function with that lon,lat pair (this may require editing the getWeatherInfo function)
    const weather = await getWeatherInfo(cityLocation.longitude, cityLocation.latitude)
    displayCityOverview(cityLocation.name, weather)
    displayFiveDayForecast(weather)
}

// Display city location and weather info within html elements
function displayCityOverview(cityName, weather) {
const currentDay = new Date ()
const overviewTitleEl = document.getElementById("overview-title")
overviewTitleEl.innerHTML = `${cityName} (${currentDay.toDateString()})`; 
const tempEl = document.getElementById("Temp")
tempEl.innerHTML = `Temp: ${weather.current.temp} &degF` 
const windEl = document.getElementById("Wind")
windEl.innerHTML = `Wind: ${weather.current.wind_speed} MPH`
const humidityEl = document.getElementById("Humidity")
humidityEl.innerHTML = `Humidity: ${weather.current.humidity} %`
const uvEl = document.getElementById('UV-Index')
uvEl.innerHTML = `UV-Index: ${weather.current.uvi}`
}

function displayFiveDayForecast(weather){
const forecastCards = document.getElementById("forecast").children

for (let i = 0; i < 5; i ++){

const forecast = weather.daily[i + 1]
const date = new Date(forecast.dt * 1000) // dt is a UNIX timestamp. We multiply it by 1000 so that we can make the date from milliseconds, and not seconds

const firstCardItems = forecastCards.item(i).children
firstCardItems.item(0).innerHTML = date.toDateString()
firstCardItems.item(1).src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`
firstCardItems.item(2).innerHTML = `Temp: ${forecast.temp.day} &degF`
firstCardItems.item(3).innerHTML = `Wind: ${forecast.wind_speed} MPH`
firstCardItems.item(4).innerHTML = `Humidity ${forecast.humidity} %`
}}

const searchBtn = document.getElementById('searchbtn')
searchBtn.addEventListener("click", handleSearch)



