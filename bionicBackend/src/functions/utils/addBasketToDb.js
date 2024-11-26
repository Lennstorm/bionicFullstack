const { db } = require("../../services/index.js");
const { v4: uuid } = require("uuid");

async function addBasketToDb(userID, basketItems) {
  try {
    const basketItemID = `basket-${userID}`; // Partition Key

    // Check if the basket already exists
    const getParams = {
      TableName: "basket-db",
      Key: {
        basketItemID,
        userID, // Sort Key
      },
    };

    const existingBasket = await db.get(getParams);

    if (existingBasket.Item) {
      // If basket exists, update the basketItems
      const existingItems = existingBasket.Item.basketItems;

      // Merge and update basketItems
      const updatedBasketItems = existingItems.map(existingItem => {
        const matchingNewItem = basketItems.find(
          newItem => newItem.menuItem === existingItem.menuItem
        );

        if (matchingNewItem) {
          return {
            ...existingItem,
            count: existingItem.count + matchingNewItem.count,
            specialRequests: matchingNewItem.specialRequests || existingItem.specialRequests,
          };
        }
        return existingItem;
      });

      // Add new items not in the existing basket
      const newItems = basketItems.filter(
        newItem => !existingItems.some(existingItem => existingItem.menuItem === newItem.menuItem)
      );

      const finalBasketItems = [...updatedBasketItems, ...newItems];

      // Update the basket in the DB
      const updateParams = {
        TableName: "basket-db",
        Key: {
          basketItemID,
          userID,
        },
        UpdateExpression: "SET basketItems = :basketItems",
        ExpressionAttributeValues: {
          ":basketItems": finalBasketItems,
        },
      };

      await db.update(updateParams);

      return {
        success: true,
        message: "Basket updated successfully",
      };
    } else {
      // If no existing basket, create a new one
      const newBasket = {
        basketItemID,
        userID,
        basketItems,
        createdAt: new Date().toISOString(),
      };

      const putParams = {
        TableName: "basket-db",
        Item: newBasket,
      };

      await db.put(putParams);

      return {
        success: true,
        message: "Basket created successfully",
      };
    }
  } catch (error) {
    console.error("Error in addBasketToDb:", error.message);
    return {
      success: false,
      message: error.message,
    };
  }
}

module.exports = { addBasketToDb };





/*
Alistair
*/