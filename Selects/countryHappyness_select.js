const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const dbconnection = require('../DBConnection.js');
const xml = require('object-to-xml');

//  Retrieve all countries JSON
app.get('/countryhappyness', function (req, res) {
        dbconnection.query('SELECT * FROM countryhappyness', function (error, results) {
            if (error) throw error;
            if (req.headers['content-type'] === "application/json"){
                res.send({Countries: results})
            } else if (req.headers['content-type'] === "application/xml"){
                res.send(xml({Countries:{Country : results}}));
            }
        });
});
module.exports = app;

