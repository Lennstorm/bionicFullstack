const { sendError, sendResponse } = require("../../responses/index.js");
const { sortMenuPrice } = require("../utils/sortMenu.js")

exports.handler = async (event) =>{

    try{
      const { direction } = JSON.parse(event.body)

      if(!direction || (direction !=="expensive" && direction !== "cheap" && direction !=="healthy" && direction !=="popular")){
        return sendError(400,'du måste lägga till en direction parameter')
      }
      const result = await sortMenuPrice(direction)

      if(!result.success){
        return sendError (404, {message:result.message})
    }
    
    return sendResponse(200, {success:true,
        data:result.data
    })
    
    
    }catch(error){
     return sendError (404, { message: error.message})
       
    }
     
}

// ******** koden skriven av Peter ***********