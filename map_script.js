var env = require('./load_env.js')
var fetch = require('node-fetch')

var googleMapsClient = require('@google/maps').createClient({
  key: env.GOOGLE_MAP_API_KEY
})

var google_script = new Promise(function(resolve, reject) {
	fetch(`${env.GOOGLE_MAP_URL}?key=${env.GOOGLE_MAP_API_KEY}&callback=initMap`).then(function(res) {
		return res.buffer()
	}).then(function(script) {
		resolve(script)
	})
})

module.exports = google_script