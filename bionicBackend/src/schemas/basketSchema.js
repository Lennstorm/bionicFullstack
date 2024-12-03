////bionicBackend/src/schemas/basketSchema.js
const Joi = require("joi");

const itemDetailsSchema = Joi.object({
    price: Joi.number().required().messages({
       
    }),
    quantity: Joi.number().required().messages({
       
    }),
    image: Joi.string().required().messages({
       
    }),
    articleName: Joi.string().required().messages({
        
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
        
    }),
    count: Joi.number().integer().min(1).required().messages({
      
    }),
    item: itemDetailsSchema.required().messages({
       
    }),
    specialRequests: Joi.string().optional().allow("").messages({
       
    }),
    orderStatus: Joi.string().optional().allow("").messages({
       
    }),
});

const schema = Joi.object({
    basketItemID: Joi.string().required().messages({
        "string.empty": "BasketItemID behövs",
    }),
    userID: Joi.string().required().messages({
        "string.empty": "AnvändarId behövs",
    }),
    basketItems: Joi.array().items(itemSchema).min(1).required().messages({
        "array.base": "En lista av artiklar behövs",
        "array.min": "Minst en artikel måste finnas",
    }),
});

module.exports = { schema };
