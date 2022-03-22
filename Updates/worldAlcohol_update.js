const express = require('express');
const app = express();
const dbconnection = require('../DBConnection.js');
var validator = require('is-my-json-valid');


var validate = validator({
    "type": 'object',
    "required": ["Country", "beer_servings", "spirit_servings", "wine_servings", "total_liters_of_alcohol"],
    "properties": {
        Country: {
            type: 'string'
        },
        beer_servings: {
            type: 'number'
        },
        spirit_servings: {
            type: 'number'
        },
        wine_servings: {
            type: 'number'
        },
        total_liters_of_alcohol: {
            type: 'number'
        }
}});

app.post('/updateCountryAlcohol', (req, res, next) => {
    if (req.headers['content-type'] === "application/json") {
        var country = {
            Country: req.body.Country,
            beer_servings: req.body.beer_servings,
            spirit_servings: req.body.spirit_servings,
            wine_servings: req.body.wine_servings,
            total_liters_of_alcohol: req.body.total_liters_of_alcohol
        };
        console.log(country)
        var sql = `UPDATE countryalcohol set beer_servings = '${req.body.beer_servings}' , spirit_servings = ${req.body.spirit_servings} , wine_servings = ${req.body.total_liters_of_alcohol} WHERE Country = '${req.body.Country}'`;
        if (validate(country)) {
            dbconnection.query(sql, function (err) {
                if (err) throw err;
                return res.send(country);
            });
        }else{
            res.send("Error data is not valid");
        }
    }else if (req.headers['content-type'] === "application/xml"){
        var json = JSON.stringify(req.body);
        var jsonObj = JSON.parse(json);

        try {
        var sql = `UPDATE countryalcohol set beer_servings = ${jsonObj.country.beer_servings[0]} , spirit_servings = ${jsonObj.country.spirit_servings[0]} , wine_servings = ${jsonObj.country.wine_servings[0]} , total_liters_of_alcohol = ${jsonObj.country.total_liters_of_alcohol[0]}  WHERE Country = '${jsonObj.country.country[0]}'`;
        var xmlText =  `<Country><Country>${jsonObj.country.country[0]}</Country><beer_servings>${jsonObj.country.beer_servings[0]}</beer_servings><spirit_servings>${jsonObj.country.spirit_servings[0]}</spirit_servings><wine_servings>${jsonObj.country.wine_servings[0]}</wine_servings><total_liters_of_alcohol>${jsonObj.country.total_liters_of_alcohol[0]}</total_liters_of_alcohol></Country>`;
        dbconnection.query(sql, [`${jsonObj.country.beer_servings[0]}, ${jsonObj.country.spirit_servings[0]}, ${jsonObj.country.wine_servings[0]}, ${jsonObj.country.total_liters_of_alcohol[0]}`], function (error, result) {
            if (error) {
                throw error;
            }else {
                res.status(200).send(xmlText);
            }
        });
        } catch (error) {
            throw error
        }
    }
});

module.exports = app;