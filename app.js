const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// DB connection
var db = require('./DBConnection');
//route vars
var worldHappyness_select = require('./worldHappyness_select.js');

//use defined routes
app.use('/worldHappyness_select', worldHappyness_select);

//setting port
app.listen(3000, function () {
    console.log('node app is running on port 3000');
});
module.exports = app;