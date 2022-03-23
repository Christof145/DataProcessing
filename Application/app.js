const express = require('express');
// DB connection
const db = require('../DBConnection');
var xmlparser = require('express-xml-bodyparser');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(xmlparser());


//Route vars:

//Insert routes
const worldGDP_insert = require('../Puts/worldGDP_insert.js');
const worldAlcohol_insert = require('../Puts/worldAlcohol_insert.js');
const worldHappyness_insert = require('../Puts/worldHappyness_insert.js');
//Update routes
const worldGDP_update = require('../Updates/worldGDP_update.js');
const worldHappyness_update = require('../Updates/worldHappyness_update.js');
const worldAlcohol_update = require('../Updates/worldAlcohol_update.js');
//Select routes
const worldHappyness_select = require('../Selects/countryHappyness_select.js');
const worldGDP_select = require('../Selects/countryGDP_select.js');
const worldAlcohol_select = require('../Selects/countryAlcohol_select.js');
//Delete routes
const worldGDP_delete = require('../Deletes/worldGDP_delete.js');
const worldHappyness_delete = require('../Deletes/worldHappyness_delete.js');
const worldAlcohol_delete = require('../Deletes/worldAlcohol_delete.js');

//Use of defined routes
//Insert routes
app.use('/worldGDP_insert', worldGDP_insert);
app.use('/worldHappyness_insert', worldHappyness_insert);
app.use('/worldAlcohol_insert', worldAlcohol_insert);
//Update routes
app.use('/worldGDP_update', worldGDP_update);
app.use('/worldHappyness_update', worldHappyness_update);
app.use('/worldAlcohol_update', worldAlcohol_update);
//Select routes
app.use('/worldGDP_select', worldGDP_select);
app.use('/worldHappyness_select', worldHappyness_select);
app.use('/worldAlcohol_select', worldAlcohol_select);
//Delete routes
app.use('/worldGDP_delete', worldGDP_delete);
app.use('/worldHappyness_delete', worldHappyness_delete);
app.use('/worldAlcohol_delete', worldAlcohol_delete);

//setting port
app.listen(3000, function () {
    console.log('node app is running on port 3000');
});
module.exports = app; 