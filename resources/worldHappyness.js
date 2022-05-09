const express = require('express');
const app = express();
const dbconnection = require('../DBConnection.js');
var validator = require('is-my-json-valid');
var xmlvalidator = require('xsd-schema-validator');
const xml = require('object-to-xml');

var jsonValidator = require('../JsonValidators/countryHappyness_Validator.js');

app.delete('/countryhappyness/:id', (req, res, next) => {
    if (req.headers['content-type'] === "application/json") {
        var sql = `DELETE FROM countryhappyness WHERE Country = '${req.body.Country}'`;
        
        dbconnection.query(sql, function (err) {
            if (err) throw err;
            return res.status(200).send("Entry deleted: " + req.body.Country);
        });
    }else if (req.headers['content-type'] === "application/xml"){
        var json = JSON.stringify(req.body);
        var jsonObj = JSON.parse(json);

        var sql = `DELETE FROM countryhappyness WHERE Country = '${jsonObj.country.country[0]}'`;
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


// TODO ADD STAT code!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.get('/countryhappyness/:id', function (req, res) {
    let id = req.params.id;
    try {
        if (req.headers['content-type'] === "application/json"){
            var sql = `SELECT * FROM countryhappyness WHERE Country = '${id}'`
            dbconnection.query(sql , function (error, results) {
                    if (error) throw error;
                    return res.status(200).send(results);
            });
        } else if (req.headers['content-type'] === "application/xml"){
            var sql = `SELECT * FROM countryhappyness WHERE Country = '${id}'`;
            dbconnection.query(sql , function (error, results) {
                if (error) throw error;
                return res.status(200).send(xml({Country : results}));
            });
        }
    } catch (error) {
        throw error;
    }
    
    
});

app.post('/countryhappyness/:id', (req, res, next) => {
    if (req.headers['content-type'] === "application/json") {
        var country = {
            Country: req.body.Country,
            Happyness_Rank: req.body.Happyness_Rank,
            Happyness_Score: req.body.Happyness_Score,
            Whisker_high: req.body.Whisker_high,
            Whisker_low: req.body.Whisker_low,
            Economy: req.body.Economy,
            Family: req.body.Family,
            Life_Expectancy: req.body.Life_Expectancy,
            Freedom: req.body.Freedom,
            Generosity: req.body.Generosity,
            Gov_Trust: req.body.Gov_Trust,
            Dystopia_Residual: req.body.Dystopia_Residual
        };

        var sql = `UPDATE countryhappyness set Happyness_Rank = '${req.body.Happyness_Rank}' , Happyness_Score = ${req.body.Happyness_Score} , Whisker_high = ${req.body.Whisker_high} , Whisker_low = ${req.body.Whisker_low} , Economy =${req.body.Economy} , Family =${req.body.Family} , Life_Expectancy =${req.body.Life_Expectancy} , Freedom =${req.body.Freedom} , Generosity =${req.body.Generosity} , Gov_Trust =${ req.body.Gov_Trust} , Dystopia_Residual =${req.body.Dystopia_Residual} WHERE Country = '${req.body.Country}'`;
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
            xmlvalidator.validateXML(req.rawBody, 'Xml/Country_Happyness.xsd', function(err, result) {
                if (err) {
                    return next(err)
                }
                result = result.valid
                var sql = `UPDATE countryhappyness set Happyness_Rank = ${jsonObj.country.happyness_rank[0]} , Happyness_Score = ${jsonObj.country.happyness_score[0]} , Whisker_high = ${jsonObj.country.whisker_high[0]} , Whisker_low = ${jsonObj.country.whisker_low[0]} , Economy =${jsonObj.country.economy[0]} , Family =${jsonObj.country.family[0]} , Life_Expectancy =${jsonObj.country.life_expectancy[0]} , Freedom =${jsonObj.country.freedom[0]} , Generosity =${jsonObj.country.generosity[0]} , Gov_Trust =${jsonObj.country.gov_trust[0]} , Dystopia_Residual =${jsonObj.country.dystopia_residual[0]} WHERE Country = '${jsonObj.country.country[0]}'`;

                dbconnection.query(sql, [`${jsonObj.country.happyness_rank[0]}, ${jsonObj.country.happyness_score[0]}, ${jsonObj.country.whisker_high[0]}, ${jsonObj.country.whisker_low[0]}, ${jsonObj.country.economy[0]}, ${jsonObj.country.family[0]}, ${jsonObj.country.life_expectancy[0]}, ${jsonObj.country.freedom[0]}, ${jsonObj.country.generosity[0]}, ${jsonObj.country.gov_trust[0]}, ${jsonObj.country.dystopia_residual[0]}, ${jsonObj.country.country[0]}`], function (error, result) {
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

app.post('/countryhappyness', (req, res, next) => {
    if (req.headers['content-type'] === "application/json") {
        var country = {
            Country: req.body.Country,
            Happyness_Rank: req.body.Happyness_Rank,
            Happyness_Score: req.body.Happyness_Score,
            Whisker_high: req.body.Whisker_high,
            Whisker_low: req.body.Whisker_low,
            Economy: req.body.Economy,
            Family: req.body.Family,
            Life_Expectancy: req.body.Life_Expectancy,
            Freedom: req.body.Freedom,
            Generosity: req.body.Generosity,
            Gov_Trust: req.body.Gov_Trust,
            Dystopia_Residual: req.body.Dystopia_Residual
        };
        
        if (jsonValidator(country)) {
            dbconnection.query("INSERT INTO countryhappyness SET ?", country, function (err) {
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
            xmlvalidator.validateXML(req.rawBody, 'Xml/Country_Happyness.xsd', function(err, result) {
                if (err) {
                    return next(err)
                }
                result = result.valid
                var sql = `INSERT INTO countryhappyness (Country, Happyness_Rank, Happyness_Score, Whisker_high, Whisker_low, Economy, Family, Life_Expectancy, Freedom, Generosity, Gov_Trust, Dystopia_Residual) VALUES ("${jsonObj.country.country[0]}", ${jsonObj.country.happyness_rank[0]}, ${jsonObj.country.happyness_score[0]}, ${jsonObj.country.whisker_high[0]}, ${jsonObj.country.whisker_low[0]}, ${jsonObj.country.economy[0]}, ${jsonObj.country.family[0]}, ${jsonObj.country.life_expectancy[0]}, ${jsonObj.country.freedom[0]}, ${jsonObj.country.generosity[0]}, ${jsonObj.country.gov_trust[0]}, ${jsonObj.country.dystopia_residual[0]})`;
                
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
