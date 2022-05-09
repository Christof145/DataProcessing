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

module.exports = validate;