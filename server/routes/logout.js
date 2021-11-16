const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("../config");
const cors = require("cors");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");

 router.get("/", (req, res) => {
    if(req.session && typeof req.session.destroy === 'function'){
        req.session.destroy();
     }
 });

module.exports = router;
