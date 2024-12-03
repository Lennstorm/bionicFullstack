const { sendError, sendResponse } = require("../../responses/index.js");
const { db } = require("../../services")


exports.handler = async (event) =>{
  
    const { id } = event.pathParameters || {}
    
   if(!id){

    return sendResponse(400, {success:false,message: "Id saknas i path parameters"})
   }
   
   
   try{
       
       
        const result = await db.delete({
            TableName: 'basket-db',
            Key : {
                "basketItemID": id,
               },
             ReturnValues : 'ALL_OLD'
        })
        if (!result.Attributes) {
            return sendResponse(404, { success: false, message: "Objektet finns inte",result});
        }
        
        return sendResponse(200, {success : true,itemDeleted:result.Attributes})
    }catch(error){
      return sendError(404, {success:false,message:error.message})
    }
}