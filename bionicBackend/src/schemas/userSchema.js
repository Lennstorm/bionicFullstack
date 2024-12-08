const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(35)
        .required()
        .messages({
            'string.empty': "Name is required",
            'string.min': "Name must be at least 3 characters",
            'string.max': "Name must be less than 36 characters"
        }),
    email: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            'string.email': 'Invalid email format',
            'string.empty': 'Email is required',
        }),
    password: Joi.string()
        .trim()
        .min(8)
        .max(128)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])'))
        .required()
        .messages({
            'string.empty': 'Password is required',
            'string.min': "Password must be at least 8 characters",
            'string.max': "Password must be less than 129 characters",
            'string.pattern.base': "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)",
        }),

});

module.exports = userSchema;


/* 
* Författare Andreas
*
*
*
*
 */