const express = require('express');
const app = express();
const dbconnection = require('../DBConnection.js');
var validator = require('is-my-json-valid');
var xmlvalidator = require('xsd-schema-validator');
const xml = require('object-to-xml');

var jsonValidator = require('../JsonValidators/countryGDP_Validator.js');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.delete('/countrygdp/:id', (req, res, next) => {
    
    if (req.headers['content-type'] === "application/json") {
        var sql = `DELETE FROM countrygdp WHERE Country = '${req.body.Country}'`;
        // As there is no data to be validated no validation is required
        dbconnection.query(sql, function (err) {
            if (err) throw err;
            return res.status(200).send("Entry deleted: " + req.body.Country);
        });
    }else if (req.headers['content-type'] === "application/xml"){
        var json = JSON.stringify(req.body);
        var jsonObj = JSON.parse(json);

        var sql = `DELETE FROM countrygdp WHERE Country = '${jsonObj.country.country[0]}'`;
        // As there is no data to be validated no validation is required
        dbconnection.query(sql, function (error, result) {
            if (error) {
                throw error;
            }else {
                return res.status(200).send("Entry deleted: " + jsonObj.country.country[0]);
            }
        });
    }
});

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

// TODO ADD STAT code!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.get('/countrygdp/:id', function (req, res) {
    let id = req.params.id;
    if (req.headers['content-type'] === "application/json"){
        var sql = `SELECT * FROM countrygdp WHERE Country = '${id}'`
        dbconnection.query(sql , function (error, results) {
                if (error) throw error;
                return res.status(200).send(results);
        });
    } else if (req.headers['content-type'] === "application/xml"){
        var json = JSON.stringify(req.body);
        var jsonObj = JSON.parse(json);

        var sql = `SELECT * FROM countrygdp WHERE Country = '${id}'`;
        dbconnection.query(sql , function (error, results) {
            if (error) throw error;
            return res.status(200).send(xml({Country : results}));
        });
    }
    
});

app.post('/countrygdp/:id', (req, res, next) => {
    if (req.headers['content-type'] === "application/json") {
        // Set req.body to local var to be validated
        // Note: this method is used for all json validation in this application!
        var country = {
            Country: req.body.Country,
            Country_Code: req.body.Country_Code,
            GDP_2000: req.body.GDP_2000,
            Suicide_Rate_2000: req.body.Suicide_Rate_2000,
            GDP_2005: req.body.GDP_2005,
            Suicide_Rate_2005: req.body.Suicide_Rate_2005,
            GDP_2010: req.body.GDP_2010,
            Suicide_Rate_2010: req.body.Suicide_Rate_2010,
            GDP_2015: req.body.GDP_2015,
            Suicide_Rate_2015: req.body.Suicide_Rate_2015,
            GDP_2016: req.body.GDP_2016,
            Suicide_Rate_2016: req.body.Suicide_Rate_2016
        };

        // SQL Query to be executed
        var sql = `UPDATE countrygdp set Country_Code = '${req.body.Country_Code}' , GDP_2000 = ${req.body.GDP_2000} , Suicide_Rate_2000 = ${req.body.Suicide_Rate_2000} , GDP_2005 = ${req.body.GDP_2005} , Suicide_Rate_2005 =${req.body.Suicide_Rate_2005} , GDP_2010 =${req.body.GDP_2010} , Suicide_Rate_2010 =${req.body.Suicide_Rate_2010} , GDP_2015 =${req.body.GDP_2015} , Suicide_Rate_2015 =${req.body.Suicide_Rate_2015} , GDP_2016 =${ req.body.GDP_2016} , Suicide_Rate_2016 =${req.body.Suicide_Rate_2016} WHERE Country = '${req.body.Country}'`;
        
        // Validate json to be processed 
        if (jsonValidator(country)) {
            // Execute SQL query with predefined SQL query
            dbconnection.query(sql, function (err) {
                // If error occurrs during connection, throw said error.
                if (err) throw err;
                // Return the entry and the status of the request
                return res.status(200).send("Entry updated: " + req.body.Country);
            });
        }else{
            res.send("Error data is not valid");
        }
    }else if (req.headers['content-type'] === "application/xml"){
        // Stringfy req.body to JSON to grab data within the object, this is done as accesing the xml body does not function and returns null.
        var json = JSON.stringify(req.body);
        var jsonObj = JSON.parse(json);

        try {
            // Validate the req.rawBody as this is the body provided in Postman
            xmlvalidator.validateXML(req.rawBody, 'Xml/CountryGDP.xsd', function(err, result) {
                // If validation fails return the error
                if (err) {
                    return next(err)
                }
                result = result.valid

                // SQL Query to be executed
                var sql = `UPDATE countrygdp set Country_Code = '${jsonObj.country.country_code[0]}' , GDP_2000 = ${jsonObj.country.gdp_2000[0]} , Suicide_Rate_2000 = ${jsonObj.country.suicide_rate_2000[0]} , GDP_2005 = ${jsonObj.country.gdp_2005[0]} , Suicide_Rate_2005 =${jsonObj.country.suicide_rate_2005[0]} , GDP_2010 =${jsonObj.country.gdp_2010[0]} , Suicide_Rate_2010 =${jsonObj.country.suicide_rate_2010[0]} , GDP_2015 =${jsonObj.country.gdp_2015[0]} , Suicide_Rate_2015 =${jsonObj.country.suicide_rate_2015[0]} , GDP_2016 =${jsonObj.country.gdp_2016[0]} , Suicide_Rate_2016 =${jsonObj.country.suicide_rate_2016[0]} WHERE Country = '${jsonObj.country.country[0]}'`;

                dbconnection.query(sql, [`${jsonObj.country.country_code[0]}, ${jsonObj.country.gdp_2000[0]}, ${jsonObj.country.suicide_rate_2000[0]}, ${jsonObj.country.gdp_2005[0]}, ${jsonObj.country.suicide_rate_2005[0]}, ${jsonObj.country.gdp_2010[0]}, ${jsonObj.country.suicide_rate_2010[0]}, ${jsonObj.country.gdp_2015[0]}, ${jsonObj.country.suicide_rate_2015[0]}, ${jsonObj.country.gdp_2016[0]}, ${jsonObj.country.suicide_rate_2016[0]}, ${jsonObj.country.country[0]}`], function (error, result) {
                    // If error occurrs during connection, throw said error else return the entry and the status of the request
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


app.post('/countrygdp', (req, res, next) => {
    if (req.headers['content-type'] === "application/json") {
        var country = {
            Country: req.body.Country,
            Country_Code: req.body.Country_Code,
            GDP_2000: req.body.GDP_2000,
            Suicide_Rate_2000: req.body.Suicide_Rate_2000,
            GDP_2005: req.body.GDP_2005,
            Suicide_Rate_2005: req.body.Suicide_Rate_2005,
            GDP_2010: req.body.GDP_2010,
            Suicide_Rate_2010: req.body.Suicide_Rate_2010,
            GDP_2015: req.body.GDP_2015,
            Suicide_Rate_2015: req.body.Suicide_Rate_2015,
            GDP_2016: req.body.GDP_2016,
            Suicide_Rate_2016: req.body.Suicide_Rate_2016
        };
        
        if (jsonValidator(country)) {
            dbconnection.query("INSERT INTO countrygdp SET ?", country, function (err) {
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
            xmlvalidator.validateXML(req.rawBody, 'Xml/CountryGDP.xsd', function(err, result) {
                if (err) {
                    return next(err)
                }
                result = result.valid
                var sql = `INSERT INTO countrygdp (Country, Country_Code, GDP_2000, Suicide_Rate_2000, GDP_2005, Suicide_Rate_2005, GDP_2010, Suicide_Rate_2010, GDP_2015, Suicide_Rate_2015, GDP_2016, Suicide_Rate_2016) VALUES ("${jsonObj.country.country[0]}", "${jsonObj.country.country_code[0]}", "${jsonObj.country.gdp_2000[0]}", "${jsonObj.country.suicide_rate_2000[0]}", "${jsonObj.country.gdp_2005[0]}", "${jsonObj.country.suicide_rate_2005[0]}", "${jsonObj.country.gdp_2010[0]}", "${jsonObj.country.suicide_rate_2010[0]}", "${jsonObj.country.gdp_2015[0]}", "${jsonObj.country.suicide_rate_2015[0]}", "${jsonObj.country.gdp_2016[0]}", "${jsonObj.country.suicide_rate_2016[0]}")`;

                dbconnection.query(sql, function (error, result) {
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

module.exports = app;