const middy = require('@middy/core');
const { createOrUpdateOrder } = require("../utils/addOrderToDb.js");
const { validateOrder } = require("../../middleware/validateAddOrder.js");

const sendError = (statusCode, errorMessage) => {
    return {
        statusCode,
        body: JSON.stringify({
            success: false,
            error: errorMessage,
        }),
    };
};

const sendResponse = (statusCode, responseBody) => {
    return {
        statusCode,
        body: JSON.stringify(responseBody),
    };
};

const orderHandler = async (event) => {
    console.log("Event body:", event.body);
    console.log("Handler event:", event);

    try {
        const body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
        const { userID, basketItems, orderStatus, orderLocked, createdAt, editedAt } = body;

        if (!userID) {
            return sendError(400, "AnvändarID saknas");
        }

        if (!Array.isArray(basketItems) || basketItems.length === 0) {
            return sendError(400, "Varukorgen är tom.");
        }

        const result = await createOrUpdateOrder(userID, basketItems, { orderStatus, orderLocked, createdAt, editedAt });

        if (!result.success) {
            return sendError(500, result.message || "Lyckades inte skapa ordern");
        }

        return sendResponse(200, { message: result.message });

    } catch (error) {
        console.error("Error in order handler:", error);
        return sendError(500, error.message || "Internal server error.");
    }
};

exports.handler = middy(orderHandler).use(validateOrder());



/*const { sendError, sendResponse } = require("../../responses/index.js");
const { addOrderToDb } = require("../utils/addOrderToDb.js");

exports.handler = async (event) => {
  try {
    if (!event.body) {
      return sendError(400, "Request body is missing");
    }

     const user = JSON.parse(event.body);
      
      if (
        user.customerID == null ||
        user.orderContents == null ||
        user.orderStatus == null ||
        user.orderLocked == null || 
        user.extraText == null ||
        user.ready == null 
       
      ) { 
        return sendError(400, "Please enter all required information (customerID,orderContents,orderStatus,orderLocked,extraText,ready)");
      }
    
      const result = await addOrderToDb(
        user.customerID,
        user.orderContents,
        user.orderStatus,
        user.orderLocked,
        user.extraText,
        user.ready,
        
      )

      if (!result.success) {
        return sendError(500, result.message || "Failed to add Order");
      }
    

    return sendResponse(200, "Order added successfully!");
  } catch (error) {
    console.error("Handler error:", error.message);
    return sendError(500, "Internal server error.");
  }
};*/

// ******** koden skriven av Peter ***********//
/*
AListair ändrat mycket
*/