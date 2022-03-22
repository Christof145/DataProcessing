const express = require('express');
// DB connection
const db = require('../DBConnection');
var xmlparser = require('express-xml-bodyparser');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(xmlparser());


//route vars
const worldGDP_insert = require('../Puts/worldGDP_insert.js');
const worldAlcohol_insert = require('../Puts/worldAlcohol_insert.js');
const worldHappyness_insert = require('../Puts/worldHappyness_insert.js');
const worldGDP_update = require('../Updates/worldGDP_update.js');
const worldHappyness_update = require('../Updates/worldHappyness_update.js');
const worldHappyness_select = require('../Selects/countryHappyness_select.js');
const worldGDP_select = require('../Selects/countryGDP_select.js');
const worldAlchol_select = require('../Selects/countryAlchol_select.js');

//use defined routes
app.use('/worldGDP_insert', worldGDP_insert);
app.use('/worldAlcohol_insert', worldAlcohol_insert);
app.use('/worldHappyness_insert', worldHappyness_insert);
app.use('/worldGDP_update', worldGDP_update);
app.use('/worldHappyness_update', worldHappyness_update);
app.use('/worldGDP_select', worldGDP_select);
app.use('/worldHappyness_select', worldHappyness_select);
app.use('/worldAlchol_select', worldAlchol_select);


//setting port
app.listen(3000, function () {
    console.log('node app is running on port 3000');
});
module.exports = app; 