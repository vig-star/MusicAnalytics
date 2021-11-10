const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("../config");
const cors = require("cors");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");

let generateCookie = function () {
  let result = "";
  let values = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 16; i++) {
    result += values.charAt(Math.floor(Math.random() * values.length));
  }
  return result;
};

let authorize = "https://accounts.spotify.com/authorize?";

let redirect_uri = config.redirectURI;

let scope = "user-read-private user-read-email";

router.get("/", (req, res) => {
  config.state = generateCookie();
  res.cookie(config.stateKey, config.state);

  res.redirect(
    authorize +
      querystring.stringify({
        response_type: "code",
        client_id: config.clientID,
        scope: scope,
        redirect_uri: redirect_uri,
        state: config.state,
      })
  );
});

module.exports = router;
