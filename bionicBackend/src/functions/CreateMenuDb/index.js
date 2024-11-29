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
      
      if (
        item.articleName == null ||
        item.allergies == null ||
        item.description == null ||
        item.fullDescription == null ||
        item.ingredience == null ||
        item.visible == null ||
        item.timeToCook == null ||
        item.price == null ||
        item.quantity == null ||
        item.inStock == null ||
        item.toDaysSpecial == null ||
        item.healthyIndex == null ||
        item.popularIndex == null ||
        item.image == null
      ) {
        return sendError(400, "Please enter all required information (quantity, description, fullDescription, price, name,healthyIndex,popularIndex)");
      }

      const result = await addMenuToDb({
        articleName: item.articleName,
        allergies: item.allergies,
        description: item.description,
        fullDescription: item.fullDescription,
        ingredience: item.ingredience,
        visible: item.visible,
        timeToCook: item.timeToCook,
        price: item.price,
        quantity: item.quantity,
        inStock: item.inStock,
        toDaysSpecial: item.toDaysSpecial,
        healthyIndex: item.healthyIndex,
        popularIndex: item.popularIndex,
        image: item.image
      
    });

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

/* 
* Författare Peter
*
* Ändrad av Andreas: lagt till fullDescription.
*
*/
