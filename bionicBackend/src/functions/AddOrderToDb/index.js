const middy = require('@middy/core');
const { checkIfOrderExists, createOrUpdateOrder } = require("../utils/addOrderToDb.js");
const { validateOrder } = require("../../middleware/validateAddOrder.js");

// Local sendError function
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
    try {
        // Parse incoming body if it's a raw string
        const body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;

        const { userID, basketItems, orderStatus, orderLocked, createdAt, editedAt } = body;

        // Ensure userID is present
        if (!userID) {
            return sendError(400, "AnvändarID saknas");
        }

        // Validate if the order already exists for this user
        const orderExists = await checkIfOrderExists(userID);
        if (orderExists) {
            return sendError(400, "En order med detta användarID existerar redan");
        }

        // Ensure basketItems is provided and not empty
        if (!Array.isArray(basketItems) || basketItems.length === 0) {
            return sendError(400, "Varukorgen är tom.");
        }

        // Create or update the order
        const result = await createOrUpdateOrder(userID, basketItems, { orderStatus, orderLocked, createdAt, editedAt });

        if (!result.success) {
            return sendError(500, result.message || "Lyckades inte skapa ordern");
        }

        // Return success response
        return sendResponse(200, { message: result.message });

    } catch (error) {
        console.error("Fel i order handler:", error.message);
        return sendError(500, error.message || "Internal server error.");
    }
};

exports.handler = middy(orderHandler).use(validateOrder());



/*const middy = require('@middy/core');
const { sendResponse, sendError } = require("../../services/index.js");
const { checkIfOrderExists, createOrUpdateOrder } = require("../utils/addOrderToDb.js");
const { validateOrder } = require("../../middleware/validateAddOrder.js");

const orderHandler = async (event) => {
    const { userID } = event;

    try {
        const orderExists = await checkIfOrderExists(userID);
        if (orderExists) {
            return sendError(400, "En order med existerar redan");
        }

        const basketItems = await fetchBasketItems(userID);
        if (basketItems.length === 0) {
            return sendError(400, "Vaurkorgen är tom.");
        }

        const result = await createOrUpdateOrder(userID, basketItems);

        if (!result.success) {
            return sendError(500, result.message || "Lyckades inte skapa ordern");
        }

        return sendResponse(200, {
            message: result.message,
        });
    } catch (error) {
        console.error("Fel i order handler:", error.message);
        return sendError(500, error.message || "Internal server error.");
    }
};

exports.handler = middy(orderHandler).use(validateOrder());*/










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