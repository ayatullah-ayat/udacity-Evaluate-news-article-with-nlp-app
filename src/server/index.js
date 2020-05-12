var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const dotenv = require('dotenv')
dotenv.config();

const aylien = require('aylien_textapi');
console.log('api id: ' + process.env.API_ID)
let textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
  });

  // textapi.imageTags({
  //   url: 'https://c1.staticflickr.com/5/4112/5170590074_714d36db83_b.jpg'
  // }, function(error, response) {
  //   if (error === null) {
  //     console.log(response.tags);
  //   }else{
  //     console.log(error)
  //   }
  // });

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
