
const middy = require('@middy/core');
const { sendError, sendResponse } = require("../../responses/index.js");
const { addBasketToDb } = require("../utils/addBasketToDb.js");
const { validateAddBasket } = require("../../middleware/validateAddBasket.js");

const handler = async (event) => {
    try {
        const { userID, basketItems } = JSON.parse(event.body);
        console.log('Received data:', { userID, basketItems });

        const result = await addBasketToDb({userID,basketItems});
        console.log('det här är result i backend handlern',result)

        if (!result.success) {
            return sendError(500, result.message || "Lyckades inte uppdatera varukorgen");
        }

        return sendResponse(200, "Varukorgen uppdaterad!");
    } catch (error) {
        console.error("Handler error:", error.message);
        return sendError(500, error.message || "Internal server error.");
    }
};

exports.handler = middy(handler).use(validateAddBasket());


/*
Alistair
*/



















