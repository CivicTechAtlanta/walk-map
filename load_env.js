var env = new Object()
require('fs')
	.readFileSync('./.env')
	.toString()
	.split('\n')
	.forEach(function(key) {
		key = key.split('=')
		env[key[0]] = key[1]
	})

module.exports = env