const { db } = require("../../services/index.js");
const { v4: uuid } = require("uuid");

async function addUserToDb(user) {
    const userid = uuid().substring(0, 8)
    
    try {
        await db.put({
            TableName: "user-to-db",
            Item: {
                userid,
                name: user.name,
                password: user.password,
                email: user.email,
                role: user.role,
          }
        });
        return {
            success: true,
            message: "user added successfully",
        };
    } catch (error) {
        return {
            success: false, message: error.message
        };
    }
}

module.exports = { addUserToDb }