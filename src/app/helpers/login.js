const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('./config');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');


let generateCookie = function() {
    let result = '';
    let values = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 16; i++) {
      result += values.charAt(Math.floor(Math.random() * values.length));
    }
    return result;
  }


  let authorize = "https://accounts.spotify.com/authorize?";

  let redirect_uri = process.env.REDIRECT_URI || 'http://localhost:4200/callback';

  let stateKey = "spotifyOath2State";

  let scope = 'user-read-private user-read-email';

router.get('/', (req, res) => {
    let state = generateCookie();
    res.cookie(stateKey, state);

    res.redirect(authorize + querystring.stringify({
      response_type: 'code',
      client_id: process.env.CLIENT_ID || '2b95b0dd175048e8bee450cdf2f4b94c',
      scope: scope,
      redirect_uri: redirect_uri,
      state, state
    }));
})

module.exports = router;
