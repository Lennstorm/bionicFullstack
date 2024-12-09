const { db } = require("../../services/index.js");
const { sendError, sendResponse } = require("../../responses/index.js");

exports.handler = async (event) => {          
  try {
    const orderItemID = event.pathParameters.orderItemID;
    const body = JSON.parse(event.body || "{}");

    const { userID, orderStatus, orderLocked } = body;

    if (!orderItemID || !userID) {
      return sendError(400, "orderItemID och userID krävs");
    }

    const getParams = {
      TableName: process.env.ORDERS_TABLE_NAME,
      Key: {
        orderItemID: orderItemID,
        userID: userID,
      },
    };

    const { Item } = await db.get(getParams);

    if (!Item) {
      return sendError(404, "Ingen order hittades att uppdatera");
    }

    let updatedOrder = { ...Item };

    if (orderStatus !== undefined) {
      updatedOrder.orderStatus = orderStatus;
    }

    if (orderLocked !== undefined) {
      updatedOrder.orderLocked = orderLocked;
    }

    const putParams = {
      TableName: process.env.ORDERS_TABLE_NAME,
      Item: updatedOrder,
    };

    await db.put(putParams);

    return sendResponse(200, {
      message: "Order uppdaterad",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Fel vid uppdatering av order", error);
    return sendError(500, "Internt serverfel");
  }
};


/* 
* Författare Andreas
*
*
*
*
*/