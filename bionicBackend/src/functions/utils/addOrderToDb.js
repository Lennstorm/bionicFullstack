const { db } = require("../../services/index.js");
const { v4: uuid } = require("uuid");
async function addOrderToDb(customerID,orderContents,orderStatus,orderLocked,extraText,ready) {

    const orderItemID = uuid().substring(0, 8)
    

    try {

        await db.put({
            TableName: "orders-db",
            Item: {

                orderItemID,
                customerID,
                orderContents,
                orderStatus,
                orderLocked,
                extraText,
                ready,
                createdAt:new Date().toISOString(),
                editedAt:new Date().toISOString()

          }

        })
        return {
            success: true,
            message: "Order added successfully",
        }

    } catch (error) {
        return {
            success: false, message: error.message

        }
    }

}

module.exports = { addOrderToDb }