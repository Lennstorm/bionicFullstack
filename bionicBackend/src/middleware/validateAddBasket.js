import Joi from 'joi';

const schema = Joi.object({
    userID: Joi.string().required().messages({
        'string.empty': 'User ID is required',
    }),
    menuItem: Joi.string().required().messages({
        'string.empty': 'Menu item is required',
    }),
    count: Joi.number().integer().min(1).required().messages({
        'number.base': 'Count must be a number',
        'number.min': 'Count must be at least 1',
    }),
    specialRequest: Joi.string().optional(),
    orderStatus: Joi.string().optional(),
});

export default schema;

