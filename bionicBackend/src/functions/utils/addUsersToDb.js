const { db } = require("../../services/index.js");
const { v4: uuid } = require("uuid");
async function addUserToDb(name,password,email,role) {

    const userid = uuid().substring(0, 8)
    

    try {

        await db.put({
            TableName: "user-db",
            Item: {

                userid,
                name,
                password,
                email,
                role,
          }

        })
        return {
            success: true,
            message: "user added successfully",
        }

    } catch (error) {
        return {
            success: false, message: error.message

        }
    }

}

module.exports = { addUserToDb }