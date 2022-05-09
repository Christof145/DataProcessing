const express = require('express');
// DB connection
const db = require('../DBConnection');
var xmlparser = require('express-xml-bodyparser');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(xmlparser());

//Route vars:
const worldGDP = require('../resources/worldGDP.js');
const worldAlcohol = require('../resources/worldAlcohol.js');
const worldHappyness = require('../resources/worldHappyness.js');

//Use of defined routes
//Insert routes
app.use('/worldGDP', worldGDP);
app.use('/worldAlcohol', worldAlcohol);
app.use('/worldHappyness', worldHappyness);

//setting port
app.listen(3000, function () {
    console.log('node app is running on port 3000');
});
module.exports = app; 