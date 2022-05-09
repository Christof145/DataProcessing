const express = require('express');
const app = express();
const dbconnection = require('../DBConnection.js');

app.delete('/deleteCountrygdp', (req, res, next) => {
    if (req.headers['content-type'] === "application/json") {
        var sql = `DELETE FROM countrygdp WHERE Country = '${req.body.Country}'`;
        
        dbconnection.query(sql, function (err) {
            if (err) throw err;
            return res.status(200).send("Entry deleted: " + req.body.Country);
        });
    }else if (req.headers['content-type'] === "application/xml"){
        var json = JSON.stringify(req.body);
        var jsonObj = JSON.parse(json);

        var sql = `DELETE FROM countrygdp WHERE Country = '${jsonObj.country.country[0]}'`;
        dbconnection.query(sql, function (error, result) {
            if (error) {
                throw error;
            }else {
                return res.status(200).send("Entry deleted: " + jsonObj.country.country[0]);
            }
        });
    }
});

module.exports = app;