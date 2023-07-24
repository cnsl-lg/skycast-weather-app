// Select HTML Element
const searchButton = document.getElementById('search-button') // Select search button
const cardColoumn = document.getElementsByClassName('card-coloumn')[0] // select card coloumn



// Make Event When the Search Button Click
searchButton.addEventListener('click', async () => {
  // Select Input Element From HTML
  const inputLocation = document.getElementById('input-location')
  // Run getWeatherAPI function and put in weatherData variable
  const weatherData = await getWeatherAPI(inputLocation.value)
  // Run the updateUI function
  updateUI(weatherData)

  // Set the Input value to empty
  inputLocation.value = ''
})


// Make function for connecting to API
function getWeatherAPI(location) {
  // Connet to Public API From weatherapi.com
  return fetch(`http://api.weatherapi.com/v1/current.json?key=dde6f13080d34176b63135831232307&q=${location}`)
          .then(results => results.json()) // Change the Promise Into Object
          .then(results => results)
}


// Make a function for displaying the results of and API
function updateUI(dataResults) {
  // Destruc the Results Object From API
  const {location, current} = dataResults
  // Put the Object Into Card Element
  cardColoumn.innerHTML = cardContent(location, current)
}


// Make Card Element and Put the Object Data to This Element
function cardContent({name, country}, {temp_c, condition, wind_kph, humidity}) {
  return `
  <div class="card w-100 border-3 rounded-5" style="width: 18rem;">
    <div class="row g-0">
      <div class="col-md-5 p-3 text-center">
        <img src="${condition.icon}" alt="" width="80">
        <h4 class="card-title mt-1">${name}</h4>
        <h6 class="card-subtitle mb-2 text-body-secondary">${country}</h6>
      </div>
      <div class="col-md-7">
        <div class="card-body">
          <h1 class="card-title">${temp_c}<sup>&#8451;</sup></h1>
          <h6 class="mb-3">${condition.text}</h6>
          <p class="card-text m-0">Wind : ${wind_kph} km/h</p>
          <p class="card-text m-0">Humidity : ${humidity}%</p>
        </div>
      </div>
    </div>
  </div>
  `
}

