var env = require('./load_env.js')
var fetch = require('node-fetch')
var google_script = new Promise(function(resolve, reject) {
	fetch(`${env.GOOGLE_MAP_URL}?key=${env.GOOGLE_MAP_API_KEY}&callback=window.walk_map`).then(function(res) {
		return res.buffer()
	}).then(function(script) {
		resolve(script)
	})
})

module.exports = google_script