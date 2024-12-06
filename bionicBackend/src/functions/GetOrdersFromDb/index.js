const { sendError, sendResponse } = require("../../responses/index.js");
const { db } = require("../../services");

exports.handler = async (event) => {
    try {
        const { Items } = await db.scan({
            TableName: process.env.ORDERS_TABLE_NAME,
        });

        const sortedItems = Items.sort((a, b) => {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });

        return sendResponse(200, sortedItems);
    } catch (error) {
        console.error("Error retrieving orders:", error);
        return sendError(500, "Could not retrieve orders: " + error.message);
    }
};


/*
Alistair
*/