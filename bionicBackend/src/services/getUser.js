//bionicBackend/src/services/getUser.js:

// denna är eventuellt redundant


const { db } = require("../services/index.js");

const getUser = async (userid, email) => {
    try {
        console.log('Fetchin user with userid:', userid)
        const { Item } = await db.get({
            TableName: 'user-db',
            Key: {
                userid: userid,
                email: email,
            },
        });
        return Item || null;
    } catch (error) {
        console.error("Error felching user:", error.message);
        throw new Error("Database error while felching user");
    }
};

module.exports = { getUser };

/* 
* Författare Andreas
*
*
 */