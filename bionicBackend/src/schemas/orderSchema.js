const Joi = require("joi");

const itemSchema = Joi.object({
    menuItem: Joi.string().required(),
    count: Joi.number().integer().min(1).required(),
    specialRequest: Joi.string().optional().allow(""),
});

const schema = Joi.object({
    userID: Joi.string().required(),
    basketItems: Joi.array().items(itemSchema).min(1).required(),
    orderStatus: Joi.string().valid("väntande", "under tillagning", "klar").required(),
    orderLocked: Joi.boolean().default(false),
    createdAt: Joi.string().isoDate().required(),
    editedAt: Joi.string().isoDate().optional(),
});

module.exports = { schema };


//med messages
/*const Joi = require("joi");

const itemSchema = Joi.object({
    menuItem: Joi.string().required().messages({
        "string.empty": "Menyartikel behövs",
    }),
    count: Joi.number().integer().min(1).required().messages({
        "number.base": "Måste vara ett nummer",
        "number.min": "Måste vara minst 1",
    }),
    specialRequest: Joi.string().optional().allow("").messages({
        "string.base": "Special request måste vara en text",
    }),
});

const schema = Joi.object({
    userID: Joi.string().required().messages({
        "string.empty": "AnvändarID behövs",
    }),
    basketItems: Joi.array().items(itemSchema).min(1).required().messages({
        "array.base": "En lista av artiklar behövs",
        "array.min": "Minst en artikel måste finnas",
    }),
    orderStatus: Joi.string().valid("väntande", "under tillagning", "klar").required().messages({
        "string.base": "Orderstatus måste vara en text",
        "any.only": "Orderstatus måste vara en av följande: väntande, under tillagning, klar",
    }),
    orderLocked: Joi.boolean().default(false).messages({
        "boolean.base": "OrderLocked måste vara en boolean",
    }),
    createdAt: Joi.string().isoDate().required().messages({
        "string.base": "Skapat datum måste vara en giltig tidsstämpel",
        "string.isoDate": "Skapat datum måste vara i ISO-format",
    }),
    editedAt: Joi.string().isoDate().optional().messages({
        "string.base": "Redigerad datum måste vara en giltig tidsstämpel",
        "string.isoDate": "Redigerad datum måste vara i ISO-format",
    }),
});

module.exports = { schema };*/


/*
Alistair
*/





