const { db } = require("../../services");
const { v4: uuid } = require("uuid");

async function addMenuToDb(item) {
    const MenuItemID = uuid().substring(0, 8);

    try {
        await db.put({
            TableName: "menu-db",
            Item: {
                MenuItemID,
                ...item
            }
        })

        return {
            success: true,
            message: "Menyn lades till framgångsrikt",
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}

module.exports = { addMenuToDb };
