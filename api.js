var fetch = require('node-fetch')
var url = require('url')

var ROOT_URL = 'https://municipal.systems/v1/municipalities'

var LIMIT = 1000

var endpoints = [
  'boundaries',
  'municipalities',
  'crimes',
  'trips',
  'issues',
  'building_permits',
  'businesses',
  'street_closures',
  'bike_lanes',
  'traffic_jams',
  'traffic_incidents',
  'traffic_cameras',
  'transit_stations',
  'lights',
  'murals',
  'government_properties',
  'parks',
  'government_vehicles',
  'events',
  'trash_containers',
  'trees',
  'parcels',
  'zones',
  'transit_routes',
  'transit_vehicles'
]

// municipality = "atl-ga"
function Api (municipality) {
  this.municipality = municipality

  var api = this
  endpoints.forEach(function (endpoint) {
    api[endpoint] = {
      get: function () {
        return api.request(endpoint)
      }
    }
  })
}

function pagedRequest (urlString, offset, previousResults) {
  var urlObject = url.parse(urlString)
  urlObject.query = { limit: LIMIT, offset: offset }
  var s = url.format(urlObject)
  console.log(s)
  return fetch(s)
    .then(function (res) {
      return res.json()
    })
    .then(function (json) {
      var combinedResults = previousResults.concat(json.results)
      var totalItems = json.meta.total
      console.log('total', totalItems, 'current', combinedResults.length)
      if (combinedResults.length < totalItems) {
        return pagedRequest(urlString, offset + LIMIT, combinedResults)
      }
      return Promise.resolve(combinedResults)
    })
}

Api.prototype.request = function (endpoint) {
  var urlString = ROOT_URL + '/' + this.municipality + '/' + endpoint
  return pagedRequest(urlString, 0, [])
}

module.exports = Api
