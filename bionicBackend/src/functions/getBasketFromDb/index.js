const { sendError, sendResponse } = require("../../responses/index.js");
const { db } = require("../../services");
exports.handler = async (event) =>{

    try{

      const { Items } = await db.scan({

        TableName: "basket-db",
        
      })
      return sendResponse(200,Items)

    }catch(error){
        return sendError(404,{message: error.message})
    }

}

// ******** koden skriven av Peter ***********