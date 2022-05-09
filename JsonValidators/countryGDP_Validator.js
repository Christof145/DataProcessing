var validator = require('is-my-json-valid');

var updateValidate = validator({
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

module.exports = updateValidate;