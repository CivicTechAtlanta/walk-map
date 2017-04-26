var express = require('express')
var MongoClient = require('mongodb').MongoClient

var url = process.env.MONGO_URL

var app = express()

var radius = 5.0 / 3963.2 // 5 miles converted to radians (by dividing radius of earth)

function getCrimeScore(db, lat, lng) {
  return db.collection('crimes').find({
      location: {
        $geoWithin: { $centerSphere: [ [ lat, lng ], radius ] }
      }
    }).count().then(function (count) {
      // minus one point for every crime in the area
      return -1 * count
    })
}

app.get('/api/score', function (req, res) {
  // calculate scores for different endpoints
  var lat = parseInt(req.query.lat, 10)
  var lng = parseInt(req.query.lng, 10)
  if (!lat || !lng) {
    return res.status(400).json({
      error: "Missing required query parameters: lat, lng"
    })
  }
  Promise.all([
    getCrimeScore(app.db, lat, lng)
    // TODO add more endpoints
  ]).then(function (results) {
    return results.reduce(function (a, b) { return a + b }, 0)
  }).then(function (score) {
    res.json({ score: score })
  }).catch(function (err) {
    res.status(500).json(err)
  })
})

MongoClient.connect(url).then(function (db) {
  app.db = db

  var port = process.env.PORT || 8080
  app.listen(port, function() {
    console.log('server listening on port ' + port)
  })
})
