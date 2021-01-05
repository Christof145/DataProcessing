const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
var dbconnection = require('./DBConnection.js');

//  Retrieve all countries JSON
app.get('/countries', function (req, res) {
        dbconnection.query('SELECT * FROM countryhapyness', function (error, results, fields) {
            if (error) throw error;

            if (req.headers['content-type'] == "application/json"){
                return res.send({Countries: results})
            } else if (req.headers['content-type'] == "application/xml"){
                return res.send(xmlString);
            }
        });
});