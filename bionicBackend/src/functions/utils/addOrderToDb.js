const { v4: uuidv4 } = require('uuid');
const { db } = require('../../services');

async function createOrUpdateOrder(userID, basketItems, { orderStatus, orderLocked, createdAt, editedAt }) {
    const orderItemID = uuidv4().substring(0, 5).toUpperCase();
    const timestamp = new Date().toISOString();

    const newOrder = {
        orderItemID,
        userID: userID.toLowerCase(),
        orderContent: basketItems.map(item => ({
            menuItemID: item.menuItem,
            articleName: item.articleName,
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


// ******** koden skriven av Peter ***********/
/*
Alistair ändrat det mesta
*/