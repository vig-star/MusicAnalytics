const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("../config");
const querystring = require("querystring");

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
        client_id: config.clientID,
        redirect_uri: redirect_uri,
        scope: scope,
        response_type: 'code',
        show_dialog: true,
        state: config.state,
      })
  );
});

module.exports = router;
