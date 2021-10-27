const express = require('express');
const request = require('request');
const cors = require('cors');
const config = require('./config');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const router = express.Router();

const app = express();

app.use(express.json());

app.use(cors({
  origin: true,
  credentials: true
}));

app.use('/', require('./home'));

app.use('/login', require('./login'));

app.use('/logout', require('./logout'));

app.listen(config.serverPort)
