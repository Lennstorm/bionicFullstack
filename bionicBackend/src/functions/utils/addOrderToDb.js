const { v4: uuidv4 } = require('uuid');
const { db } = require('../../services');

async function createOrUpdateOrder(userID, basketItems, { orderStatus, orderLocked, createdAt, editedAt }) {
    const orderItemID = uuidv4();
    const timestamp = new Date().toISOString();

    const newOrder = {
        orderItemID,
        userID: userID.toLowerCase(),
        orderContent: basketItems.map(item => ({
            menuItemID: item.menuItem,
            count: item.count,
            specialRequest: item.specialRequest,
        })),
        orderStatus: orderStatus || 'väntande',
        orderLocked: orderLocked || false,
        createdAt: createdAt || timestamp,
        editedAt: editedAt || timestamp,
    };

    console.log("DynamoDB Table Name:", 'orders-db-v4');

    try {
        await db.put({
            TableName: 'orders-db-v4',
            Item: newOrder,
        });
        return {
            success: true,
            message: 'Order created successfully',
        };
    } catch (error) {
        console.error('Error in createOrUpdateOrder:', error);
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
/*
Alistair ändrat det mesta
*/