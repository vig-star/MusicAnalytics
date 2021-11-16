const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config');

router.get('/', (req, res) => {
  let BASE_URL = 'https://api.spotify.com/v1/';
  let headers = {'Authorization': 'Bearer ' + config.access_token}
  if (config.access_token != "") {
    request(
      {
        method: "GET",
        url: BASE_URL + "me",
        headers: headers,
        json: true,
      }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          console.log("Getting Profile");
          console.log(body);
          console.log(body['display_name']);
          res.send(
            {
              'email' : body['display_name']
            });
        } else {
          console.log("Error fetching profile");
        }
    });
  }
});

module.exports = router;