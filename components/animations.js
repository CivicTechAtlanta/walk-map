var loading_animation = {
	loading: true,
	i: 0,
	e: document.getElementsByClassName('bubble-char'),
	j: document.getElementsByClassName('bubble-char').length - 1,
	go: function() {
		if (loading_animation.loading == false) {
			window.cancelAnimationFrame(loading_animation.go)
			return document.getElementById('map_loader').remove()
		}
		if (loading_animation.i % 10 == 0) {
			e = document.getElementsByClassName('bubble-char')
			e[loading_animation.j].classList.remove('strong')
			loading_animation.j++
			if (loading_animation.j == loading_animation.e.length) {
				loading_animation.j = 0
			}
			e[loading_animation.j].classList.add('strong')
		}

		loading_animation.i = loading_animation.i == 500 ? loading_animation.i = 0 : loading_animation.i + 1

		window.requestAnimationFrame(loading_animation.go)
	}
}

module.exports = {
	loading_animation: loading_animation
}