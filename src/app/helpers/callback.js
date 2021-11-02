const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('./config');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');


router.get('/', (req, res) => {
  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[stateKey] : null;



})

