var MongoClient = require('mongodb').MongoClient
var Api = require('./api')

var endpointsOfInterest = [
  'crimes',
  'lights',
  'parks',
  'murals'
]

var url = process.env.MONGO_URL

var atl = new Api('atl-ga')

console.log('Connecting to database')
MongoClient.connect(url).then(function (db) {
  // start by clearing the database
  console.log('clearing existing data')
  // get all collections
  return db.collections().then(function (collections) {
    // for each collection
    return Promise.all(
      collections
        // if it is one of endpointsOfInterest
        .filter(function (collection) {
          return endpointsOfInterest.indexOf(collection.name) !== -1
        })
        // drop it
        .map(function (collection) {
          return collection.drop()
        })
    )
  })

  // then load and insert data
  .then(function () {
    // for each endpoint of interest
    return Promise.all(
      endpointsOfInterest
        .map(function (endpoint) {
          // load all the data from the api
          console.log('Loading data for', endpoint)
          return atl[endpoint].get()
            // then insert all the loaded data
            .then(function (data) {
              console.log('', data.length, 'records found for', endpoint)
              return db.collection(endpoint).insertMany(data)
            })
            .then(function () {
              console.log('Updated', endpoint, 'in database')
            })
        })
    )
  })

  // finally close the db
  .then(function () {
    return db.close()
  })
})
.catch(function (err) {
  console.error('Problem loading data: ', err)
})