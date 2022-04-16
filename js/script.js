// Weather API 
async function getWeatherInfo(longitude, latitude) {
    const apiweatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=722979637d7f44411802fb9c1783e210&units=imperial`;
    const result = await fetch(apiweatherUrl).then(response => response.json())
    return result
}

async function getCityLocation(city) {
    const apiGeoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=722979637d7f44411802fb9c1783e210`
    const response = await fetch(apiGeoURL).then(response => response.json())
    const cityData = response[0] 
    const result = { longitude: cityData.lon, latitude: cityData.lat, name: cityData.name, state: cityData.state, country: cityData.country }
    return result
}
// Search Button
async function handleSearch() {
    const textInput = document.getElementById("searchInput").value
    const cityLocation = await getCityLocation(textInput)
    const weather = await getWeatherInfo(cityLocation.longitude, cityLocation.latitude)
    displayCityOverview(cityLocation.name, weather)
    displayFiveDayForecast(weather)
}

// Display city location and weather info 
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

// Five Day Forecast 
function displayFiveDayForecast(weather){
const forecastCards = document.getElementById("forecast").children

for (let i = 0; i < 5; i ++){

const forecast = weather.daily[i + 1]
const date = new Date(forecast.dt * 1000) // dt is a UNIX timestamp. Multiply it by 1000 so that to make the date from milliseconds, and not seconds

const firstCardItems = forecastCards.item(i).children
firstCardItems.item(0).innerHTML = date.toDateString()
firstCardItems.item(1).src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`
firstCardItems.item(2).innerHTML = `Temp: ${forecast.temp.day} &degF`
firstCardItems.item(3).innerHTML = `Wind: ${forecast.wind_speed} MPH`
firstCardItems.item(4).innerHTML = `Humidity: ${forecast.humidity} %`
}}

// Declaring Variables 
const searchBtn = document.getElementById('searchbtn')
searchBtn.addEventListener("click", handleSearch)

// City Buttons
const cityBtns = document.getElementsByClassName('city')

for (var i = 0; i < cityBtns.length; i++){
    let btn = cityBtns.item(i)
    btn.addEventListener("click", function(){
        document.getElementById("searchInput").value = btn.innerHTML
        handleSearch();
    
    })
}
cityBtns.addEventListener("click")



