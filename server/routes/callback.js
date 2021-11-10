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
  request(
    // POST request to /token endpoint
    {
      method: "POST",
      uri: `https://accounts.spotify.com/api/token`,
      form: {
        code: req.query.code,
        redirect_uri: config.redirectURI,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(config.clientID + ":" + config.clientSecret).toString(
            "base64"
          ),
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
      } else {
        console.log("error");
        console.log(response.statusCode);
      }
    }
  );
});

module.exports = router;
