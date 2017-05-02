var google_script = require('./map_script.js')

let map_height = 400

let css = `
	#map {
		height: ${map_height}px;
		width: 100%;
	}
`

module.exports = function(res, lat, lng) {
	google_script.then(function(map) {
		res.end(`
			<!DOCTYPE html>
			<html lang='en'>
			  <head>
			    <meta charset='utf8'>
			    <style>${css}</style>
			  </head>
			  <body>
			    <div id="map"></div>
			    <script>
			      function initMap() {
			        // Create a map object and specify the DOM element for display.
			        var map = new google.maps.Map(document.getElementById('map'), {
			          center: {lat: ${lat}, lng: ${lng}},
			          scrollwheel: false,
			          zoom: 15
			        });
			        google.maps.event.trigger(map, "resize");

			        console.log(map)
			      }
			    </script>
			    <script type='text/javascript' async defer>${map}</script>
			  </body>
			</html>
		`)
	})
}