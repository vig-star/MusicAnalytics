const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("../config");
const cors = require("cors");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");

router.get("/", (req, res) => {
  console.log(req.query.code);
  console.log(req.query.state);

  let code = req.query.code || null;
  let state = req.query.state || null;
  let cookie = req.cookies ? req.cookies[config.stateKey] : null;
  if (state !== null && state === cookie) {
     res.clearCookie(config.stateKey);
     request(
         // POST request to /token endpoint
         {
           method: "POST",
           url: 'https://accounts.spotify.com/api/token',
           form: {
             code: code,
             redirect_uri: config.redirectURI,
             grant_type: 'authorization_code',
           },
           headers: {
             'Authorization':
               'Basic ' +
               new Buffer.from(config.clientID + ':' + config.clientSecret).toString('base64'),
           },
           json: true,
         },

         // callback
         (error, response, body) => {
           if (!error && response.statusCode === 200) {
             config.access_token = body.access_token;
             config.refresh_token = body.refresh_token;
             console.log(config.access_token);
             console.log(config.refresh_token);
             res.redirect(`http://localhost:${config.clientPort}`);
             request (
             {
               method: "GET",
               uri: 'https://api.spotify.com/v1/me',
               headers: { 'Authorization': 'Bearer ' + config.access_token },
               json: true,
             },
             (error, response, body) => {
               console.log(body);
             });
           } else {
             console.log("error");
             console.log(response.statusCode);
             console.log(response.headers);
           }
         }
       );
  } else {
    console.log("Cookie mismatch or null state");
  }
});

module.exports = router;
