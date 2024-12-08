//bionicBackend/src/functions/UpdateOrder/index.js

const { db } = require("../../services/index.js");
const { sendError, sendResponse } = require("../../responses/index.js");

exports.handler = async (event) => {
  try {
    const orderItemID = event.pathParameters.orderItemID;
    const body = JSON.parse(event.body || '{}');

    const { userID, orderStatus, orderLocked, updatedDish } = body;

    if (!orderItemID || !userID) {
      return sendError(400, "orderItemID och userID krävs");
    }

    const getParams = {
      TableName: process.env.ORDERS_TABLE_NAME,
      Key: {
        orderItemID: orderItemID,
        userID: userID
      }
    };

    const { Item } = await db.get(getParams);

    if (!Item) {
      return sendError(404, "ingen order hittades att uppdatera");
    }

    let updatedOrder = { ...Item };

    if (orderStatus !== undefined) {
      updatedOrder.orderStatus = orderStatus;
    }

    if (orderLocked !== undefined) {
      updatedOrder.orderLocked = orderLocked;
    }

    if (updatedDish && updatedDish.menuItem) {
      if (!updatedOrder.orderContent || !Array.isArray(updatedOrder.orderContent)) {
        return sendError(400, "orderContent saknas eller är inte en array");
      }

      const dishIndex = updatedOrder.orderContent.findIndex(d => d.menuItem === updatedDish.menuItem);
      if (dishIndex === -1) {
        return sendError(404, "Maträtten hittades inte i orderContent");
      }

      if (updatedDish.specialRequest !== undefined) {
        updatedOrder.orderContent[dishIndex].specialRequest = updatedDish.specialRequest;
      }
      
    }

    const putParams = {
      TableName: process.env.ORDERS_TABLE_NAME,
      Item: updatedOrder 
    };

    await db.put(putParams);

    return sendResponse(200, {message: "order uppdaterad", order: updatedOrder});
  } catch (error) {
    console.error("Fel vid uppdatering av order", error);
    return sendError(500, "Internt serverfel");
  }
};

/*     
    let UpdateExpression = "set";
    const ExpressionAttributeValues = {};
    const ExpressionAttributeNames = {};

    let somethingToUpdate = false;

    if (orderStatus !== undefined) {
      UpdateExpression += " #os = :os,";
      ExpressionAttributeValues[":os"] = orderStatus;
      ExpressionAttributeNames["#os"] = "orderStatus";
      somethingToUpdate = true;
    }

    if (orderLocked !== undefined) {
      UpdateExpression += " #ol = :ol,";
      ExpressionAttributeValues[":ol"] = orderLocked;
      ExpressionAttributeNames["#ol"] = "orderLocked";
      somethingToUpdate = true;
    }

    
    if (somethingToUpdate) {
      UpdateExpression = UpdateExpression.slice(0, -1);
    } else {    
      return sendError(400, "Inga fält att uppdatera angavs");
    }

    const params = {
      TableName: process.env.ORDERS_TABLE_NAME,
      Key: {
        orderItemID: orderItemID,
        userID: userID
      },
      UpdateExpression,
      ExpressionAttributeValues,
      ExpressionAttributeNames,
      ReturnValues: "ALL_NEW"
    };

    const result = await db.update(params);
    return sendResponse(200, { message: "Order uppdaterad", order: result.Attributes });
  } catch (error) {
    console.error("Fel vid uppdatering av order:", error.message);
    return sendError(500, "Internt serverfel");
  }

 */