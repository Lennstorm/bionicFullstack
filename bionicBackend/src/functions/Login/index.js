//bionicBackend/src/functions/Login/index.js

const middy = require('@middy/core');
const { errorHandler } = require("../../middleware/errorHandler.js");
/* const { validateKey } = require("../../middleware/validateKey.js"); */
const { validateLogin } = require("../../middleware/validateLogin.js");
const { sendError, sendResponseWithHeaders } = require("../../responses/index.js");
const { generateJWT } = require("../utils/loginUtils.js")

const handler = async (event) => {
    try {
        const user = event.user;

        const token = generateJWT(user);
        console.log('Generated token i backend:', token);//bör inte loggas i slutprodukten! Känslig info!

        return sendResponseWithHeaders(200, {
            message: 'Login successful!'
        }, token);
    } catch (error) {
        console.error("Handler error", error.message);
        return sendError(500, error.message || "Internal server error.");
    }
};


module.exports.handler = middy(handler)
    /* .use(validateKey()) */
    .use(validateLogin())
    .use(errorHandler());


/* 
*Författare Andreas
*
* 
* 
* 
*  
*
*/