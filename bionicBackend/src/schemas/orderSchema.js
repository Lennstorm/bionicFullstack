const Joi = require("joi");

const itemSchema = Joi.object({
    menuItem: Joi.string().required(),
    articleName: Joi.string().required(),
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


/*
Alistair
*/





