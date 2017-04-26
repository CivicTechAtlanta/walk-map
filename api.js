var fetch = require('node-fetch')

// function request(url, offset, results) {
//   fetch(url + '?limit=500&offset=' + offset)
//     .then(function (res) { return res.json() })
//     .then(function (json) {
//       var totalItems = json.meta.total
//       var combinedResults =   
//     })
// }

// municipality = "atl-ga" //TODO page through results
module.exports = function request (municipality, endpoint) {
  return fetch('https://municipal.systems/v1/municipalities/' + municipality + '/' + endpoint + '?limit=1000')
    .then(function (res) { return res.json() })
}