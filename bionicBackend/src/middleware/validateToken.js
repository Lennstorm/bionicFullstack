const jwt = require("jsonwebtoken");
require('dotenv').config();

const validateToken  = () => ({
    before : (handler) => {
        const token = handler.event.headers.authorization && handler.event.headers.authorization.split(' ')[1];
        console.log('validate', token);

        const decodedToken = jwt.verify(token, proces.env.SECRET_ACCESS_KEY);

        if(!decodedToken) {
            throw new Error('Invalid token');
        }
        return;        
    }
});