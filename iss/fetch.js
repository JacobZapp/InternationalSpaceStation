
let url = 'https://api.wheretheiss.at/v1/satellites/25544'
let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')
let update = 10000
let maxFailedAttempts = 3
let issMarker
let timeIssLocationFetched = document.querySelector('#time')

let icon = L.icon({
    iconUrl: 'iss_icon.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25] // shifts where the icon is relative to what you want to mark
})




let map = L.map('iss-map').setView([0,0], 1)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

iss(maxFailedAttempts) // calling function first makes things a little faster, and it better for the server we are talking to
// setInterval(iss, update) // 10 second interval
function iss(attempts) {

    if (attempts <= 0 ) {
        alert('Too many Failed Attempts')
        return
    }


    fetch(url) // fetch does not use callback functions, they return something called a promise
        .then((res) => { // Then follows each others, so the res.json will store its information in the issData function, but remember that they follow each other
            return res.json()
        })
        .then((issData) => {
        console.log(issData)
        let lat = issData.latitude // getting from Json File
        let long = issData.longitude
        issLat.innerHTML = lat
        issLong.innerHTML = long
        if(!issMarker) {
         // create marker
         issMarker = L.marker([lat,long], {icon: icon}).addTo(map)
        } else {
            issMarker.setLatLng([lat, long]) // this is how we get it to move
        }
        // this is showing us the updated time for when the iss moved
        let now = Date()
        timeIssLocationFetched.innerHTML = `This data was fetched on ${now}`
    })
        .catch((err) => {
        attempts = attempts - 1; // attempts-- is the same thing
        console.log('ERROR!', err)
    })
        .finally(() => {
        setTimeout(iss, update, attempts)
    })
}
