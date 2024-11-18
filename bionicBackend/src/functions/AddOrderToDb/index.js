const { sendError, sendResponse } = require("../../responses/index.js");
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
};