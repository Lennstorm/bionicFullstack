const Joi = require("joi");


const itemSchema = Joi.object({
    menuItem: Joi.string().required().messages({
        "string.empty": "Menyartikel behövs",
    }),
    count: Joi.number().integer().min(1).required().messages({
        "number.base": "Måste vara ett nummer",
        "number.min": "Måste vara minst 1",
    }),
    specialRequests: Joi.string().optional().allow("").messages({
        "string.base": "Specialrequest måste vara en text",
    }),
    orderStatus: Joi.string().optional().allow("").messages({
        "string.base": "Orderstatus måste vara en text",
    }),
});

const schema = Joi.object({
    userID: Joi.string().required().messages({
        "string.empty": "AnvändarId behövs",
    }),
    basketItems: Joi.array().items(itemSchema).min(1).required().messages({
        "array.base": "En lista av artiklar behövs",
        "array.min": "Minst en artikel måste finnas",
    }),
});

module.exports = { schema };

/*
Alistair
*/
