const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('./config');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');


router.get('/', (req, res) => {
    const url = 'https://accounts.spotify.com/en/status'
    const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=700,height=500,top=40,left=40')
    setTimeout(() => spotifyLogoutWindow.close(), 2000)
})

module.exports = router;
