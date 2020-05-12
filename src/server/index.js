var path = require('path')
// Require express to run server and routes
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const app = express()
// Middleware
const bodyParser = require('body-parser')
// configuring express to use body-parser as middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())


// *****************aylien api setup*************** //
const dotenv = require('dotenv')
dotenv.config();

const aylien = require('aylien_textapi');
let textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
  });


app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile('dist/index.html')
})

app.post('/language', (req, res) => {
    textapi.language({
        text: req.body.text
      }, function(error, response) {
        if (error === null) {
          console.log(response);
          res.send(response)
        }else{
            console.log(error)
        }
      });
})
// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
