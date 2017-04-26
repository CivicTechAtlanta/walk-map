var express = require('express')
var MongoClient = require('mongodb').MongoClient

var url = process.env.MONGO_URL

var app = express()

MongoClient.connect(url)
  .then(function (db) {

    app.get('/api/score', function (req, res) {

      // crimes
      db.collection('crimes').find({
        location: {
          $geoWithin: {
            $centerSphere: [
              [ req.params.lat, req.params.lng ],
              5.0 / 3963.2
            ]
          }
        }
      }, function (err, docs) {
        if (err) {
          res.setStatus(500).json(err)
        } else {
          var count = 0;
          docs.forEach(function (e,i,a) {
            count++;
          })
          res.json({ score: count })
        }
      })
    })

    app.listen(process.env.port || 8080, function() {
      console.log('server listening')
    })

  })

// missing:
// street closures
// bike lanes
// murals
// government_properties
// parks
// government_vehicles
// trees

// have:
// traffic_incidents
// crime
// traffic_cameras
// transit_stations
// lights
// businesses
// events (no meaningful data)
// parcels
// zones
// transit_vehicles (no meaningful data)
// issues
