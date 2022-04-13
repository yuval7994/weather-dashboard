async function getWeatherInfo(longitude, latitude) {
    const apiweatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=722979637d7f44411802fb9c1783e210`;
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
}

// Display city location and weather info within html elements
function displayCityOverview(cityName, weather) {
    console.log(weather)
const currentDay = new Date ()
const overviewTitleEl = document.getElementById("overview-title")
overviewTitleEl.innerHTML = `${cityName} (${currentDay.toDateString()})`; 
}

const searchBtn = document.getElementById('searchbtn')
searchBtn.addEventListener("click", handleSearch)



