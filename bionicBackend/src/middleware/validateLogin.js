//bionicBackend/src/middleware/validateLogin.js:
const { getUserByEmail } = require("../services/getUserByEmail.js");
const { comparePasswords } = require("../functions/utils/loginUtils.js")

const validateLogin = () => ({
    before : async (request) => {
        const reqUser = JSON.parse(request.event.body);

        if (!reqUser.email || !reqUser.password) {
            const error = new Error("E-post och lösenord erfordras!");
            error.statusCode = 400;
            throw error;
        }
        
        const user = await getUserByEmail(reqUser.email);        
        if (!user) {            
            const error = new Error("E-posten finns inte registrerad.");
            error.statusCode = 404;
            throw error;
        }
        
        const isEqual = await comparePasswords(reqUser.password, user.password);
        if(!isEqual) {            
            const error = new Error(`E-post och lösenord matchar inte.`);
            error.statusCode = 401;
            throw error;         
        }
        request.event.user = user;
    },
});

module.exports = { validateLogin };