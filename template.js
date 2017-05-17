var google_script = require('./map_script.js')

// TODO - convert to sass
let map_height = 400
let css = `
	#map, #map_loader {
		height: ${map_height}px;
		width: 100%;
	}
	#map_loader {
		position: absolute;
		background: white;
		z-index: 1;
	}
	#map_loader td {
		vertical-align: middle;
		text-align: center;
		font-size: 3em;
		font-family: Roboto, -apple-system, system-ui, "Helvetica Neue", "Segoe UI", Oxygen, Ubuntu, Cantarell, "Open Sans", sans-serif;
		height: 100%;
		width: 100%;
	}
	#map_loader table {
		height: 100%;
		width: 100%;
	}
	.bubble-char {
		display: inline-block;
		transition: 0.5s all;
	}
	.strong {
		font-weight: 800;
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
			  	<div id='map_loader'>

			  		<table>

			  			<tbody>

			  				<tr>

			  					<td>

			  						<div class='bubble-char'>w</div>
			  						<div class='bubble-char'>a</div>
			  						<div class='bubble-char'>l</div>
			  						<div class='bubble-char'>k</div>
			  						<div class='bubble-char'>m</div>
			  						<div class='bubble-char'>a</div>
			  						<div class='bubble-char'>p</div>

			  					</td>

			  				</tr>

			  			</tbody>

			  		</table>

			  	</div>

			    <div id='map'></div>
			    
			    <script type='text/javascript' src='/bundle.js'></script>
			    <script type='text/javascript' async defer>${map}</script>
			  </body>
			</html>
		`)
	})
}