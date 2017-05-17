var React = require('react')
var ReactDOM = require('react-dom')
var $anim = require('./animations.js')

var request = function() {
	var dom = this

	dom.map = {}

	dom.display = function() {
		var score = JSON.parse(this.response);

		// TODO
	}

	dom.getScore = function(lat, lng) {
		$anim.loading_animation.loading = false 

		var xhr = new XMLHttpRequest()
		xhr.open('GET', '/api/score?lat=' + lat + '&lng=' + lng)
		xhr.addEventListener('load', dom.display)
		xhr.send()
	}

	dom.requestScore = function() {
		window.navigator.geolocation.getCurrentPosition(function(position) {
			dom.map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
			dom.getScore(position.coords.latitude, position.coords.longitude);
		}, function(er) {
			console.log('Navigator doesn\'t work in this environemnt')
			var center = dom.map.getCenter()
			dom.getScore(center.lat(), center.lng())
		})
	}

	dom.map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 33.7633864, lng: -84.3973038},
		scrollwheel: false,
		zoom: 15
	})

	google.maps.event.trigger(map, "resize");

	dom.requestScore()

}

if (typeof window == 'undefined') {
	return false
} else {
	window.walk_map = request
	$anim.loading_animation.go()
}
