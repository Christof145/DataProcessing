const express = require('express');
const app = express();
const dbconnection = require('../DBConnection.js');
var validator = require('is-my-json-valid');
var xmlvalidator = require('xsd-schema-validator');

var validate = validator({
    "type": 'object',
    "required": ["Country", "Country_Code", "GDP_2000", "Suicide_Rate_2000", "GDP_2005", "Suicide_Rate_2005", "GDP_2010", "Suicide_Rate_2010", "GDP_2015", "Suicide_Rate_2015", "GDP_2016", "Suicide_Rate_2016"],
    "properties": {
        Country: {
            type: 'string'
        },
        Country_Code: {
            type: 'string'
        },
        GDP_2000: {
            type: 'number'
        },
        Suicide_Rate_2000: {
            type: 'number'
        },
        GDP_2005: {
            type: 'number'
        },
        Suicide_Rate_2005: {
            type: 'number'
        },
        GDP_2010: {
            type: 'number'
        },
        Suicide_Rate_2010: {
            type: 'number'
        },
        GDP_2015: {
            type: 'number'
        },
        Suicide_Rate_2015: {
            type: 'number'
        },
        GDP_2016: {
            type: 'number'
        },
        Suicide_Rate_2016: {
            type: 'number'
        }
}});


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
        
        if (validate(country)) {
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