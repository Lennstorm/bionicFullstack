const Joi = require('joi');

const itemSchema = Joi.object({
    menuItem: Joi.string().required().messages({
        'string.empty': 'Menyartikel behövs',
    }),
    count: Joi.number().integer().min(1).required().messages({
        'number.base': 'Måste vara ett nummer',
        'number.min': 'Måste vara minst 1',
    }),
    specialRequests: Joi.string().optional().allow('').messages({
        'string.base': 'Specialrequest måste vara en text',
    }),
    orderStatus: Joi.string().optional().allow('').messages({
        'string.base': 'Orderstatus måste vara en text',
    }),
});

const schema = Joi.object({
    userID: Joi.string().required().messages({
        'string.empty': 'AnvändarId behövs',
    }),
    basketItems: Joi.array().items(itemSchema).min(1).required().messages({
        'array.base': 'En lista av artiklar behövs',
        'array.min': 'Minst en artikel måste finnas',
    }),
});

const validateAddBasket = () => {
    return {
        before: async (handler) => {
            try {
                const { error } = schema.validate(JSON.parse(handler.event.body));
                if (error) {
                    throw new Error(error.details[0].message);
                }
            } catch (err) {
                console.error('Validation error:', err.message);
                handler.response = {
                    statusCode: 400,
                    body: JSON.stringify({ message: err.message || 'Invalid request data' }),
                };
                throw err;
            }
        },
    };
};

module.exports = validateAddBasket;


/*
Alistair
*/


