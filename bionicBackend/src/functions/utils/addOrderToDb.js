const { v4: uuidv4 } = require('uuid');
const { db } = require("../../services/index.js");

async function createOrUpdateOrder(userID, basketItems, { orderStatus, orderLocked }) {
    const orderItemID = uuidv4();
    const timestamp = new Date().toISOString();


    const newOrder = {
        orderItemID,
        userid: userID.toLowerCase(),
        orderContent: basketItems,
        orderStatus: orderStatus || "väntande",
        orderLocked: orderLocked || false,
        specialRequests: basketItems
        .map(item => item.specialRequest)
        .filter(request => request)
        .join(', '),
        createdAt: timestamp,
        editedAt: timestamp,
    };
    console.log("New Order to be inserted:", JSON.stringify(newOrder, null, 2));


    const putParams = {
        TableName: "orders-db-v3",
        Item: newOrder,
    };
    console.log("New Order Object:", newOrder);

    try {
        await db.put(putParams);

        return {
            success: true,
            message: "Order created successfully",
        };
    } catch (error) {
        console.error("Error in createOrUpdateOrder:", error.message);
        return {
            success: false,
            message: error.message,
        };
    }
}

module.exports = { createOrUpdateOrder };











/*const { db } = require("../../services/index.js");
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

// ******** koden skriven av Peter ***********/