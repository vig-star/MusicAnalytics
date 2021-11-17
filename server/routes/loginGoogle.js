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

let authorize = "https://accounts.google.com/o/oauth2/v2/auth?";

let redirect_uri = config.googleredirectURI;

let scope = "https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtubepartner-channel-audit";

router.get("/", (req, res) => {
  config.googlestate = generateCookie();
  res.cookie(config.googlestateKey, config.googlestate);

  res.redirect(
    authorize +
      querystring.stringify({
        client_id: config.googleClientID,
        redirect_uri: redirect_uri,
        scope: scope,
        response_type: 'code',
        prompt: "consent",
        include_granted_scopes: true,
        state: config.googlestate,
      })
  );
});

module.exports = router;
