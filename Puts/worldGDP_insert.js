const express = require('express');
const app = express();
const dbconnection = require('../DBConnection.js');
var validator = require('is-my-json-valid');
var xmlValidator = require('xsd-schema-validator');
var validate = validator({
            "type": 'object',
            "required": ['Country', "Country_Code", "GDP_2000", "Suicide_Rate_2000", "GDP_2005", "Suicide_Rate_2005", "GDP_2010", "Suicide_Rate_2010", "GDP_2015", "Suicide_Rate_2015", "GDP_2016", "Suicide_Rate_2016"],
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
const testJson = {
    "Country" : 'Argentina',
    "Country_Code": "1456",
    "GDP_2000": 7708.1,
    "Suicide_Rate_2000": 9.5,
    "GDP_2005": 5109.85,
    "Suicide_Rate_2005": 9,
    "GDP_2010": 10386,
    "Suicide_Rate_2010": 8.7,
    "GDP_2015": 13789.1,
    "Suicide_Rate_2015": 8.8,
    "GDP_2016": 12790.2,
    "Suicide_Rate_2016": 9.2
}
const testXml = '{<Country>abcdef</Country><Country_Code>LATIN AMER. CARIB</Country_Code><GDP_2000>39921833</GDP_2000><Suicide_Rate_2000>2766890</Suicide_Rate_2000><GDP_2005>14.4</GDP_2005><Suicide_Rate_2005>0.18</Suicide_Rate_2005><GDP_2010>0.61</GDP_2010><Suicide_Rate_2010>15.18</Suicide_Rate_2010><GDP_2015>11200</GDP_2015><Suicide_Rate_2015>97.1</Suicide_Rate_2015><GDP_2016>220.4</GDP_2016><Suicide_Rate_2016>12.31</Suicide_Rate_2016>}';

xmlValidator.validateXML(testXml, "../Xml/countrygdp_isvalid.xsd", function(err, result) {

        console.log(result);
        return result;
});
console.log('should be valid', validate(testJson));
console.log(validate.errors);

app.post('/countrygdp', function (req, res) {

    let country = {};

    if (req.headers['content-type'] === "application/json") {
        country = {
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
                return res.send({Countries: {country}});
            });
        }else{
            res.send("Error data is not valid");
        }
    }else if (req.headers['content-type'] === "application/xml"){
        country = {
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
        // I cant get xml to validate :(
        // also I think my CountryHappyness.xsd is correct and would validate CountryHappyness.xml
        // but there is a problem with this .xsd __ (changed xs:schema to xsd:schema
        //                                        \|/
        xmlValidator.validateXML(country, '../Xml/countrygdp_isvalid.xsd', function(err, result) {
            if (err) {
                throw err;
            }else if(result === true){
                dbconnection.query("INSERT INTO countrygdp SET ?", country, function (error) {
                    if (error) throw error;
                    return res.send({Countries:{country}});
                });
            }
        });
    }
});
module.exports = app;