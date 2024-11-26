const { sendError, sendResponse } = require("../../responses/index.js");
const { addBasketToDb } = require("../utils/addBasketToDb.js");

exports.handler = async (event) => {
    try {
        if (!event.body) {
            return sendError(400, "Request body saknas");
        }

        const basket = JSON.parse(event.body);

        const result = await addBasketToDb(basket.userID, basket.basketItems);

        if (!result.success) {
            return sendError(500, result.message || "Lyckades inte uppdatera varukorgen");
        }

        return sendResponse(200, "Varukorgen uppdaterad!");
    } catch (error) {
        console.error("Handler error:", error.message);
        return sendError(500, "Internal server error.");
    }
};

/*
Alistair
*/



















