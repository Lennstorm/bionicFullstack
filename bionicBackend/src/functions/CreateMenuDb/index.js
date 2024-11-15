const { sendError, sendResponse } = require("../../responses/index.js");
const { addMenuToDb } = require("../utils/addMenuToDb.js");

exports.handler = async (event) => {
  try {
    if (!event.body) {
      return sendError(400, "Request body is missing");
    }

    const menu = JSON.parse(event.body);

    if (!Array.isArray(menu)) {
      return sendError(400, "Body must be an array of Menu");
    }

    if (menu.length < 1) {
      return sendError(400, "You must add at least one item to the menu");
    }

    for (let item of menu) {
      // Check for undefined or null values
      if (
        item.articleName == null ||
        item.allergies == null ||
        item.description == null ||
        item.ingredience == null ||
        item.visible == null ||
        item.timeToCook == null ||
        item.price == null ||
        item.quantity == null ||
        item.inStock == null ||
        item.toDaysSpecial == null ||
        item.image == null
      ) {
        return sendError(400, "Please enter all required information (quantity, description, price, name)");
      }

      const result = await addMenuToDb(
        item.articleName,
        item.allergies,
        item.description,
        item.ingredience,
        item.visible,
        item.timeToCook,
        item.price,
        item.quantity,
        item.inStock,
        item.toDaysSpecial,
        item.image
      );

      if (!result.success) {
        console.log(result)
        return sendError(500, result.message || "Failed to add Menu");
      }
    }

    return sendResponse(200, "All menus added successfully!");
  } catch (error) {
    console.error("Handler error:", error.message);
    return sendError(500, "Internal server error.");
  }
};
