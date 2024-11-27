const { v4: uuidv4 } = require("uuid");
const { db } = require("../../services/index.js");

async function createOrUpdateOrder(userID, basketItems) {
    const orderItemID = uuidv4();
    const timestamp = new Date().toISOString();

    const getParams = {
        TableName: "orders-db-v2",
        Key: { pk: orderItemID, sk: userID },
    };

    console.log('Getting existing order with params:', JSON.stringify(getParams, null, 2));

    try {
        const existingOrder = await db.get(getParams);

        if (existingOrder.Item) {
            const existingItems = existingOrder.Item.orderContent;

            const updatedOrderItems = existingItems.map(existingItem => {
                const matchingNewItem = basketItems.find(
                    newItem => newItem.menuItem === existingItem.menuItem
                );

                if (matchingNewItem) {
                    return {
                        ...existingItem,
                        count: existingItem.count + matchingNewItem.count,
                        specialRequests: matchingNewItem.specialRequests || existingItem.specialRequests,
                    };
                }
                return existingItem;
            });

            const newItems = basketItems.filter(
                newItem => !existingItems.some(existingItem => existingItem.menuItem === newItem.menuItem)
            );

            const finalOrderItems = [...updatedOrderItems, ...newItems];

            const updateParams = {
                TableName: "orders-db-v2",
                Key: { pk: orderItemID, sk: userID },
                UpdateExpression: "SET orderContent = :orderContent, editedAt = :editedAt",
                ExpressionAttributeValues: {
                    ":orderContent": finalOrderItems,
                    ":editedAt": timestamp,
                },
            };

            console.log('Updating order with params:', JSON.stringify(updateParams, null, 2));

            await db.update(updateParams);

            return {
                success: true,
                message: "Order updated successfully",
            };
        } else {
            const newOrder = {
                pk: orderItemID,
                sk: userID,
                orderContent: basketItems,
                orderStatus: "väntande",
                orderLocked: false,
                createdAt: timestamp,
                editedAt: timestamp,
            };

            const putParams = {
                TableName: "orders-db-v2",
                Item: newOrder,
            };

            console.log('Creating new order with params:', JSON.stringify(putParams, null, 2));

            await db.put(putParams);

            return {
                success: true,
                message: "Order created successfully",
            };
        }
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