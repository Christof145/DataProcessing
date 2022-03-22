const express = require('express');
const app = express();
const dbconnection = require('../DBConnection.js');
var validator = require('is-my-json-valid');
var xmlValidator = require('xsd-schema-validator');
var builder = require('xmlbuilder');

var validate = validator({
    "type": 'object',
    "required": ['Country', "Happyness_Rank", "Happyness_Score", "Whisker_high", "Whisker_low", "Economy", "Family", "Life_Expectancy", "Freedom", "Generosity", "Gov_Trust", "Dystopia_Residual"],
    "properties": {
        Country: {
            type: 'string'
        },
        Happyness_Rank: {
            type: 'number'
        },
        Happyness_Score: {
            type: 'number'
        },
        Whisker_high: {
            type: 'number'
        },
        Whisker_low: {
            type: 'number'
        },
        Economy: {
            type: 'number'
        },
        Family: {
            type: 'number'
        },
        Life_Expectancy: {
            type: 'number'
        },
        Freedom: {
            type: 'number'
        },
        Generosity: {
            type: 'number'
        },
        Gov_Trust: {
            type: 'number'
        },
        Dystopia_Residual: {
            type: 'number'
        }
}});

app.post('/updateCountryHappyness', (req, res, next) => {
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
        console.log(country)
        var sql = `UPDATE countrygdp set Happyness_Rank = '${req.body.Happyness_Rank}' , Happyness_Score = ${req.body.Happyness_Score} , Whisker_high = ${req.body.Whisker_high} , Whisker_low = ${req.body.Whisker_low} , Economy =${req.body.Economy} , Family =${req.body.Family} , Life_Expectancy =${req.body.Life_Expectancy} , Freedom =${req.body.Freedom} , Generosity =${req.body.Generosity} , Gov_Trust =${ req.body.Gov_Trust} , Dystopia_Residual =${req.body.Dystopia_Residual} WHERE Country = '${req.body.Country}'`;
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
        console.log(json)
        console.log(jsonObj)
        // var xml = builder.create('Country')
        // .ele('Country', {'type': 'xsd:string'}, jsonObj.country.country[0]).up()
        // .ele('Country_Code', {'type': 'xsd:string'}, jsonObj.country.country_code[0]).up()
        // .ele('GDP_2000', {'type': 'xsd:float'}, jsonObj.country.gdp_2000[0]).up()
        // .ele('Suicide_Rate_2000', {'type': 'xs:float'}, jsonObj.country.suicide_rate_2000[0]).up()
        // .ele('GDP_2005', {'type': 'xs:float'}, jsonObj.country.gdp_2005[0]).up()
        // .ele('Suicide_Rate_2005', {'type': 'xs:float'}, jsonObj.country.suicide_rate_2005[0]).up()
        // .ele('GDP_2010', {'type': 'xs:float'}, jsonObj.country.gdp_2010[0]).up()
        // .ele('Suicide_Rate_2010', {'type': 'xs:float'}, jsonObj.country.suicide_rate_2010[0]).up()
        // .ele('GDP_2015', {'type': 'xs:float'}, jsonObj.country.gdp_2015[0]).up()
        // .ele('Suicide_Rate_2015', {'type': 'xs:float'}, jsonObj.country.suicide_rate_2015[0]).up()
        // .ele('GDP_2016', {'type': 'xs:float'}, jsonObj.country.gdp_2016[0]).up()
        // .ele('Suicide_Rate_2016', {'type': 'xs:float'}, jsonObj.country.suicide_rate_2016[0]).up()
        // .end({ pretty: true});

        // console.log(xml);
        var xmlText =  `<Country><Country>${jsonObj.country.country[0]}</Country><Happyness_Rank>${jsonObj.country.happyness_rank[0]}</Happyness_Rank><Happyness_Score>${jsonObj.country.happyness_score[0]}</Happyness_Score><Whisker_high>${jsonObj.country.whisker_high[0]}</Whisker_high><Whisker_low>${jsonObj.country.whisker_low[0]}</Whisker_low><Economy>${jsonObj.country.economy[0]}</Economy><Family>${jsonObj.country.family[0]}</Family><Life_Expectancy>${jsonObj.country.life_expectancy[0]}</Life_Expectancy><Freedom>${jsonObj.country.freedom[0]}</Freedom><Generosity>${jsonObj.country.generosity[0]}</Generosity><Gov_Trust>${jsonObj.country.gov_trust[0]}</Gov_Trust><Dystopia_Residual>${jsonObj.country.dystopia_residual[0]}</Dystopia_Residual></Country>`;
        var sql = `UPDATE countryhappyness set Happyness_Rank = ${jsonObj.country.happyness_rank[0]} , Happyness_Score = ${jsonObj.country.happyness_score[0]} , Whisker_high = ${jsonObj.country.whisker_high[0]} , Whisker_low = ${jsonObj.country.whisker_low[0]} , Economy =${jsonObj.country.economy[0]} , Family =${jsonObj.country.family[0]} , Life_Expectancy =${jsonObj.country.life_expectancy[0]} , Freedom =${jsonObj.country.freedom[0]} , Generosity =${jsonObj.country.generosity[0]} , Gov_Trust =${jsonObj.country.gov_trust[0]} , Dystopia_Residual =${jsonObj.country.dystopia_residual[0]} WHERE Country = '${jsonObj.country.country[0]}'`;
        // xmlValidator.validateXML(xml,'../Xml/CountryGDP.xsd', (error, result) => {
            dbconnection.query(sql, [`${jsonObj.country.happyness_rank[0]}, ${jsonObj.country.happyness_score[0]}, ${jsonObj.country.whisker_high[0]}, ${jsonObj.country.whisker_low[0]}, ${jsonObj.country.economy[0]}, ${jsonObj.country.family[0]}, ${jsonObj.country.life_expectancy[0]}, ${jsonObj.country.freedom[0]}, ${jsonObj.country.generosity[0]}, ${jsonObj.country.gov_trust[0]}, ${jsonObj.country.dystopia_residual[0]}, ${jsonObj.country.country[0]}`], function (error, result) {
                if (error) {
                    throw error;
                }else {
                    res.status(200).send(xmlText);
                    console.log
                }
            });
        // });
    }
});

module.exports = app;