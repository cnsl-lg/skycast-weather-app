const searchButton = document.getElementById('search-button')
const cardColoumn = document.getElementsByClassName('card-coloumn')[0]

const getAPI = (function () {
  fetch(`http://api.weatherapi.com/v1/current.json?key=dde6f13080d34176b63135831232307&q=indonesia`)
    .then(results => results.json())
    .then(results => {
      const {location, current} = results
      return cardColoumn.innerHTML = cardContent(location, current)
    })
})()


searchButton.addEventListener('click', () => {
  const inputLocation = document.getElementById('input-location')
  
  fetch(`http://api.weatherapi.com/v1/current.json?key=dde6f13080d34176b63135831232307&q=${inputLocation.value}`)
  .then(results => results.json())
  .then(results => {
    const {location, current} = results
    return cardColoumn.innerHTML = cardContent(location, current)
  })

  inputLocation.value = ''
})

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

