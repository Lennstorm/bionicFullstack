async function addOrderToDb(basketItemID, userID) {
    try {
        // Mocked data for testing
        const mockBasketItems = [
            { menuItem: "Burger", count: 2, specialRequests: "No onions" },
            { menuItem: "Pizza", count: 1, specialRequests: "Extra cheese" }
        ];

        const orderItemID = uuid();

        // Simulate creating order contents from mock data
        const orderContents = mockBasketItems.map(item => ({
            menuItem: item.menuItem,
            count: item.count,
            specialRequest: item.specialRequests,
        }));

        const orderStatus = "väntande";
        const orderLocked = false;
        const specialRequest = "";
        const createdAt = new Date().toISOString();
        const editedAt = new Date().toISOString();


        await db.put({
            TableName: "orders-db",
            Item: {
                orderItemID,
                userID,
                orderContents,
                orderStatus,
                orderLocked,
                specialRequest,
                createdAt,
                editedAt,
            },
        });

        return {
            success: true,
            message: "Order added successfully",
            orderItemID,
        };

    } catch (error) {
        console.error("Error in addOrderToDb:", error.message);
        return {
            success: false,
            message: error.message,
        };
    }
}







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