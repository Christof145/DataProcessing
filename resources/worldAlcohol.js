const express = require('express');
const app = express();
const dbconnection = require('../DBConnection.js');
var xmlvalidator = require('xsd-schema-validator');
const xml = require('object-to-xml');

var jsonValidator = require('../JsonValidators/countryAlcohol_Validator.js');

app.delete('/countryalcohol/:id', (req, res, next) => {
    if (req.headers['content-type'] === "application/json") {
        var sql = `DELETE FROM countryalcohol WHERE Country = '${req.body.Country}'`;
        
        dbconnection.query(sql, function (err) {
            if (err) throw err;
            return res.status(200).send("Entry deleted: " + req.body.Country);
        });
    }else if (req.headers['content-type'] === "application/xml"){
        var json = JSON.stringify(req.body);
        var jsonObj = JSON.parse(json);

        var sql = `DELETE FROM countryalcohol WHERE Country = '${jsonObj.country.country[0]}'`;
        dbconnection.query(sql, function (error, result) {
            if (error) {
                throw error;
            }else {
                return res.status(200).send("Entry deleted: " + jsonObj.country.country[0]);
            }
        });
    }
});

//  Retrieve all countries in selected format
app.get('/countryalcohol', function (req, res) {
    dbconnection.query('SELECT * FROM countryalcohol', function (error, results) {
        if (error) throw error;
        if (req.headers['content-type'] === "application/json"){
            return res.status(200).res.send(results)
        } else if (req.headers['content-type'] === "application/xml") {
            return res.status(200).res.send(xml({Countries:{Country : results}}));
        }
    });
});

app.get('/countryalcohol/:id', function (req, res) {
    let id = req.params.id;
    if (req.headers['content-type'] === "application/json"){
        var sql = `SELECT * FROM countryalcohol WHERE Country = '${id}'`
        dbconnection.query(sql , function (error, results) {
                if (error) throw error;
                return res.status(200).send(results);
        });
    } else if (req.headers['content-type'] === "application/xml"){
        var json = JSON.stringify(req.body);
        var jsonObj = JSON.parse(json);

        var sql = `SELECT * FROM countryalcohol WHERE Country = '${id}'`;
        dbconnection.query(sql , function (error, results) {
            if (error) throw error;
            return res.status(200).send(xml({Country : results}));
        });
    }
    
});

app.post('/countryalcohol', (req, res, next) => {
    if (req.headers['content-type'] === "application/json") {
        var country = {
            Country: req.body.Country,
            beer_servings: req.body.beer_servings,
            spirit_servings: req.body.spirit_servings,
            wine_servings: req.body.wine_servings,
            total_liters_of_alcohol: req.body.total_liters_of_alcohol
        };

        if (jsonValidator(country)) {
            dbconnection.query("INSERT INTO countryalcohol SET ?", country, function (err) {
                if (err) throw err;
                return res.status(200).send("Entry inserted: " + req.body.Country);
            });
        }else{
            res.send("Error data is not valid");
        }
    }else if (req.headers['content-type'] === "application/xml"){
        var json = JSON.stringify(req.body);
        var jsonObj = JSON.parse(json);

        try {
            xmlvalidator.validateXML(req.rawBody, 'Xml/Alcohol_Consumption.xsd', function(err, result) {
                if (err) {
                    return next(err)
                }
                
                var sql = `INSERT INTO countryalcohol (Country, beer_servings, spirit_servings, wine_servings, total_liters_of_alcohol) VALUES ("${jsonObj.country.country[0]}", "${jsonObj.country.beer_servings[0]}", "${jsonObj.country.spirit_servings[0]}", "${jsonObj.country.wine_servings[0]}", "${jsonObj.country.total_liters_of_alcohol[0]}")`;

                dbconnection.query(sql, function (error, result) {
                    // NO response occurs on dupllicate entry!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    if (error) {
                        throw error;
                    }else {
                        return res.status(200).send("Entry inserted: " + jsonObj.country.country[0]);
                    }
                });
            });
        } catch (error) {
            throw error
        }
    }
});

app.post('/countryalcohol/:id', (req, res, next) => {
    if (req.headers['content-type'] === "application/json") {
        var country = {
            Country: req.body.Country,
            beer_servings: req.body.beer_servings,
            spirit_servings: req.body.spirit_servings,
            wine_servings: req.body.wine_servings,
            total_liters_of_alcohol: req.body.total_liters_of_alcohol
        };

        var sql = `UPDATE countryalcohol set beer_servings = '${req.body.beer_servings}' , spirit_servings = ${req.body.spirit_servings} , wine_servings = ${req.body.total_liters_of_alcohol} WHERE Country = '${req.body.Country}'`;
        if (jsonValidator(country)) {
            dbconnection.query(sql, function (err) {
                if (err) throw err;
                return res.status(200).send("Entry updated: " + req.body.Country);
            });
        }else{
            res.send("Error data is not valid");
        }
    }else if (req.headers['content-type'] === "application/xml"){
        var json = JSON.stringify(req.body);
        var jsonObj = JSON.parse(json);

        try {
            xmlvalidator.validateXML(req.rawBody, 'Xml/Alcohol_Consumption.xsd', function(err, result) {
                if (err) {
                    return next(err)
                }
                result = result.valid
                var sql = `UPDATE countryalcohol set beer_servings = ${jsonObj.country.beer_servings[0]} , spirit_servings = ${jsonObj.country.spirit_servings[0]} , wine_servings = ${jsonObj.country.wine_servings[0]} , total_liters_of_alcohol = ${jsonObj.country.total_liters_of_alcohol[0]}  WHERE Country = '${jsonObj.country.country[0]}'`;
                dbconnection.query(sql, [`${jsonObj.country.beer_servings[0]}, ${jsonObj.country.spirit_servings[0]}, ${jsonObj.country.wine_servings[0]}, ${jsonObj.country.total_liters_of_alcohol[0]}`], function (error, result) {
                    if (error) {
                        throw error;
                    }else {
                        return res.status(200).send("Entry updated: " + jsonObj.country.country[0]);
                    }
                });
            });
        } catch (error) {
            throw error
        }
    }
});

module.exports = app;