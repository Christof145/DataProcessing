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


app.post('/updateCountrygdp', (req, res, next) => {
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
        console.log(country)
        var sql = `UPDATE countrygdp set Country_Code = '${req.body.Country_Code}' , GDP_2000 = ${req.body.GDP_2000} , Suicide_Rate_2000 = ${req.body.Suicide_Rate_2000} , GDP_2005 = ${req.body.GDP_2005} , Suicide_Rate_2005 =${req.body.Suicide_Rate_2005} , GDP_2010 =${req.body.GDP_2010} , Suicide_Rate_2010 =${req.body.Suicide_Rate_2010} , GDP_2015 =${req.body.GDP_2015} , Suicide_Rate_2015 =${req.body.Suicide_Rate_2015} , GDP_2016 =${ req.body.GDP_2016} , Suicide_Rate_2016 =${req.body.Suicide_Rate_2016} WHERE Country = '${req.body.Country}'`;
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

        // var xmlText =  `<Country><Country>${jsonObj.country.country[0]}</Country><Country_Code>${jsonObj.country.country_code[0]}</Country_Code><GDP_2000>${jsonObj.country.gdp_2000[0]}</GDP_2000><Suicide_Rate_2000>${jsonObj.country.suicide_rate_2000[0]}</Suicide_Rate_2000><GDP_2005>${jsonObj.country.gdp_2005[0]}</GDP_2005><Suicide_Rate_2005>${jsonObj.country.suicide_rate_2005[0]}</Suicide_Rate_2005><GDP_2010>${jsonObj.country.gdp_2010[0]}</GDP_2010><Suicide_Rate_2010>${jsonObj.country.suicide_rate_2010[0]}</Suicide_Rate_2010><GDP_2015>${jsonObj.country.gdp_2015[0]}</GDP_2015><Suicide_Rate_2015>${jsonObj.country.suicide_rate_2015[0]}</Suicide_Rate_2015><GDP_2016>${jsonObj.country.gdp_2016[0]}</GDP_2016><Suicide_Rate_2016>${jsonObj.country.suicide_rate_2016[0]}</Suicide_Rate_2016></Country>`;
        let avalidator = require('xsd-schema-validator')
        try{
            console.log('here');
            avalidator.validateXML(req, 'Xml/CountryGDP.xsd', function(err, result) {
                if (err) {
                    console.log('in err here')
                    return next(err)
                }
                console.log('passed error if: ', result.valid)
                result.valid; // true
                return res.status(200).json({
                    message: 'xml validated and correct'
                });
            });
        } catch (e) {
            console.log(e)
        }
        // try {
        //     xmlvalidator.validateXML(req, 'Xml/CountryGDP.xsd', function(err, result) {
        //         console.log(result.valid);
        //         if (err === true) {
        //             return next(err);
        //         }
        //         var sql = `UPDATE countrygdp set Country_Code = '${jsonObj.country.country_code[0]}' , GDP_2000 = ${jsonObj.country.gdp_2000[0]} , Suicide_Rate_2000 = ${jsonObj.country.suicide_rate_2000[0]} , GDP_2005 = ${jsonObj.country.gdp_2005[0]} , Suicide_Rate_2005 =${jsonObj.country.suicide_rate_2005[0]} , GDP_2010 =${jsonObj.country.gdp_2010[0]} , Suicide_Rate_2010 =${jsonObj.country.suicide_rate_2010[0]} , GDP_2015 =${jsonObj.country.gdp_2015[0]} , Suicide_Rate_2015 =${jsonObj.country.suicide_rate_2015[0]} , GDP_2016 =${jsonObj.country.gdp_2016[0]} , Suicide_Rate_2016 =${jsonObj.country.suicide_rate_2016[0]} WHERE Country = '${jsonObj.country.country[0]}'`;
        //         dbconnection.query(sql, [`${jsonObj.country.country_code[0]}, ${jsonObj.country.gdp_2000[0]}, ${jsonObj.country.suicide_rate_2000[0]}, ${jsonObj.country.gdp_2005[0]}, ${jsonObj.country.suicide_rate_2005[0]}, ${jsonObj.country.gdp_2010[0]}, ${jsonObj.country.suicide_rate_2010[0]}, ${jsonObj.country.gdp_2015[0]}, ${jsonObj.country.suicide_rate_2015[0]}, ${jsonObj.country.gdp_2016[0]}, ${jsonObj.country.suicide_rate_2016[0]}, ${jsonObj.country.country[0]}`], function (error, result) {
        //             if (error) {
        //                 throw error;
        //             }else {
        //                 res.status(200).send(sql);
        //                 console.log
        //             }
        //         });
        //         });
        // } catch (error) {
        //     throw error
        // }
    }
});

module.exports = app;