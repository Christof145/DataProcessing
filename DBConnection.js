const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'world'
});

dbConn.connect();

module.exports = dbConn;