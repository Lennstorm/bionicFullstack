//bionicBackend/src/functions/UpdateRequest/index.js

const { db } = require("../../services/index.js");
const { sendError, sendResponse } = require("../../responses/index.js");

exports.handler = async (event) => {
  try {
    const orderItemID = event.pathParameters.orderItemID;
    const body = JSON.parse(event.body || "{}");

    const { userID, menuItemID, specialRequest } = body;

    if (!orderItemID || !userID || !menuItemID || specialRequest === undefined) {
      console.error("Valideringsfel: Saknade obligatoriska fält.");
      return sendError(400, "orderItemID, userID, menuItemID och specialRequest krävs");
    }

    const getParams = {
      TableName: process.env.ORDERS_TABLE_NAME,
      Key: {
        orderItemID: orderItemID,
        userID: userID,
      },
    };

    console.log("Hämtar order från databasen med params:", getParams);

    const { Item } = await db.get(getParams);

    if (!Item) {
      console.error("Ingen order hittades.");
      return sendError(404, "Ingen order hittades att uppdatera");
    }

    console.log("Hämtad order:", Item);
    
    const dishIndex = Item.orderContent.findIndex((d) => d.menuItemID === menuItemID);

    if (dishIndex === -1) {
      console.error("Maträtten hittades inte i orderContent.");
      return sendError(404, "Maträtten hittades inte i orderContent");
    }
    
    Item.orderContent[dishIndex].specialRequest = specialRequest;

    const putParams = {
      TableName: process.env.ORDERS_TABLE_NAME,
      Item: Item,
    };

    console.log("Uppdaterad order som ska sparas:", Item);

    await db.put(putParams);

    return sendResponse(200, {
      message: "SpecialRequest uppdaterad",
      order: Item,
    });
  } catch (error) {
    console.error("Fel vid uppdatering av specialRequest", error);
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