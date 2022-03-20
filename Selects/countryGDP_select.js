const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dbconnection = require('../DBConnection.js');
const xml = require('object-to-xml');

//  Retrieve all countries JSON
app.get('/countrygdp', function (req, res) {
    dbconnection.query('SELECT * FROM countrygdp', function (error, results) {
        if (error) throw error;
        if (req.headers['content-type'] === "application/json"){
            res.send({Countries: results})
        } else if (req.headers['content-type'] === "application/xml"){
            res.send(xml({Countries:{Country : results}}));
        }
    });
});
module.exports = app;