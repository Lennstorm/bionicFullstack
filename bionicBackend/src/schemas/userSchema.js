const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': "Name is required",
    }),
    password: Joi.string().required().messages({
        'string.empty': 'Password is required',
    }),
    email: Joi.string().required().messages({
        'string.email': 'Invalid email format',
        'string.empty': 'Email is required',
    }),
});

module.exports = userSchema;