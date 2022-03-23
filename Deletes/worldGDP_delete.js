const express = require('express');
const app = express();
const dbconnection = require('../DBConnection.js');

app.post('/updateCountrygdp', (req, res, next) => {
    if (req.headers['content-type'] === "application/json") {
        var sql = `DELETE FROM countrygdp WHERE ${req.body.Country}`;
        // var sql = `UPDATE countrygdp set Country_Code = '${req.body.Country_Code}' , GDP_2000 = ${req.body.GDP_2000} , Suicide_Rate_2000 = ${req.body.Suicide_Rate_2000} , GDP_2005 = ${req.body.GDP_2005} , Suicide_Rate_2005 =${req.body.Suicide_Rate_2005} , GDP_2010 =${req.body.GDP_2010} , Suicide_Rate_2010 =${req.body.Suicide_Rate_2010} , GDP_2015 =${req.body.GDP_2015} , Suicide_Rate_2015 =${req.body.Suicide_Rate_2015} , GDP_2016 =${ req.body.GDP_2016} , Suicide_Rate_2016 =${req.body.Suicide_Rate_2016} WHERE Country = '${req.body.Country}'`;
        
        dbconnection.query(sql, function (err) {
            if (err) throw err;
            return res.status(200).send("Entry deleted");
        });
    }else if (req.headers['content-type'] === "application/xml"){
        var json = JSON.stringify(req.body);
        var jsonObj = JSON.parse(json);
        try {
            var sql = `DELETE FROM countrygdp WHERE ${jsonObj.country.country[0]}`;
            // var sql = `UPDATE countrygdp set Country_Code = '${jsonObj.country.country_code[0]}' , GDP_2000 = ${jsonObj.country.gdp_2000[0]} , Suicide_Rate_2000 = ${jsonObj.country.suicide_rate_2000[0]} , GDP_2005 = ${jsonObj.country.gdp_2005[0]} , Suicide_Rate_2005 =${jsonObj.country.suicide_rate_2005[0]} , GDP_2010 =${jsonObj.country.gdp_2010[0]} , Suicide_Rate_2010 =${jsonObj.country.suicide_rate_2010[0]} , GDP_2015 =${jsonObj.country.gdp_2015[0]} , Suicide_Rate_2015 =${jsonObj.country.suicide_rate_2015[0]} , GDP_2016 =${jsonObj.country.gdp_2016[0]} , Suicide_Rate_2016 =${jsonObj.country.suicide_rate_2016[0]} WHERE Country = '${jsonObj.country.country[0]}'`;
            // var xmlText =  `<Country><Country>${jsonObj.country.country[0]}</Country><Country_Code>${jsonObj.country.country_code[0]}</Country_Code><GDP_2000>${jsonObj.country.gdp_2000[0]}</GDP_2000><Suicide_Rate_2000>${jsonObj.country.suicide_rate_2000[0]}</Suicide_Rate_2000><GDP_2005>${jsonObj.country.gdp_2005[0]}</GDP_2005><Suicide_Rate_2005>${jsonObj.country.suicide_rate_2005[0]}</Suicide_Rate_2005><GDP_2010>${jsonObj.country.gdp_2010[0]}</GDP_2010><Suicide_Rate_2010>${jsonObj.country.suicide_rate_2010[0]}</Suicide_Rate_2010><GDP_2015>${jsonObj.country.gdp_2015[0]}</GDP_2015><Suicide_Rate_2015>${jsonObj.country.suicide_rate_2015[0]}</Suicide_Rate_2015><GDP_2016>${jsonObj.country.gdp_2016[0]}</GDP_2016><Suicide_Rate_2016>${jsonObj.country.suicide_rate_2016[0]}</Suicide_Rate_2016></Country>`;
            dbconnection.query(sql, function (error, result) {
                if (error) {
                    throw error;
                }else {
                    return res.status(200).send("Entry deleted");
                }
            });
        } catch (error) {
            throw error
        }
    }
});

module.exports = app;