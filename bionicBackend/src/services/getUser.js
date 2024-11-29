const { db } = require("../services/index.js");

const getUser = async (username) => {
    try {
        const { Item } = await db.get({
            TableName: 'user-db',
            Key: {
                userid: userid,
            },
        });
        return Item || null;
    } catch (error) {
        console.error("Error fetching user:", error.message);
        throw new Error("Database error while fetching user");
    }

};

module.exports = { getUser };