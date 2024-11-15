const { db } = require("../../services");
const { v4: uuid } = require("uuid");
async function addMenuToDb(articleName, allergies, description,ingredience,visible,timeToCook,price,quantity, inStock,toDaysSpecial,image) {

    const MenuItemID = uuid().substring(0, 8)
    

    try {

        await db.put({
            TableName: "menu-db",
            Item: {

                MenuItemID,
                articleName,
                allergies,
                description,
                ingredience,
                visible,
                timeToCook,
                price,
                quantity,
                inStock,
                toDaysSpecial,
                image
            }

        })
        return {
            success: true,
            message: "menu added successfully",
        }

    } catch (error) {
        return {
            success: false, message: error.message

        }
    }

}

module.exports = { addMenuToDb }