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

http://localhost:8080/api/score?lat=-84.484257&lng=33.789231

MONGO_URL=... npm start

Api usage

```js
var Api = require('./api')
var atl = new Api('atl-ga')
atl.crimes.get().then(function (crimes) {
  // ...
})
```