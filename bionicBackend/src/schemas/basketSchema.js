const Joi = require("joi");

const itemDetailsSchema = Joi.object({
    price: Joi.number().required().messages({
        "number.base": "Pris måste vara ett nummer",
    }),
    quantity: Joi.number().required().messages({
        "number.base": "Antal måste vara ett nummer",
    }),
    image: Joi.string().required().messages({
        "string.base": "Bild måste vara en text",
    }),
    articleName: Joi.string().required().messages({
        "string.base": "Artikelnamn måste vara en text",
    }),
});

const itemSchema = Joi.object({
    basketItemID: Joi.string().optional().messages({
        "string.base": "BasketItemID måste vara en text",
    }),
    userID: Joi.string().optional().messages({
        "string.base": "UserID måste vara en text",
    }),
    menuItem: Joi.string().required().messages({
        "string.empty": "Menyartikel behövs",
    }),
    count: Joi.number().integer().min(1).required().messages({
        "number.base": "Måste vara ett nummer",
        "number.min": "Måste vara minst 1",
    }),
    item: itemDetailsSchema.required().messages({
        "object.base": "Item måste vara ett objekt",
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
