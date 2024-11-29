const { getUser } = require("../services/getUser.js");
const { comparePasswords } = require("../functions/utils/loginUtils")

const validateLogin = () => ({
    before : async (handler) => {
        const reqUser = JSON.parse(handler.event.body);

        if (!reqUser.userid || !reqUser.password) {
            const error = new Error("Användar-id och lösenord erfordras!");
            error.statusCode = 400;
            throw error;
        }
        
        const user = await getUser(reqUser.userid);        
        if (!user) {            
            const error = new Error("Användar-id finns inte registrerat.");
            error.statusCode = 404;
            throw error;
        }
        
        const isEqual = await comparePasswords(reqUser.password, user.password);
        if(!isEqual) {            
            const error = new Error(`E-post och lösenord matchar inte.`);
            error.statusCode = 401;
            throw error;         
        }
        handler.event.user = user;
    },
});

module.exports = { validateLogin };