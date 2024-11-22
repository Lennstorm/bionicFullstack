const { sendError, sendResponse } = require("../../responses/index.js");
const { addUserToDb } = require("../utils/addUsersToDb.js");

exports.handler = async (event) => {
  try {
    if (!event.body) {
      return sendError(400, "Request body is missing");
    }

     const user = JSON.parse(event.body);
      
      if (
        user.name == null ||
        user.password == null ||
        user.email == null ||
        user.role == null 
       
      ) { 
        return sendError(400, "Please enter all required information (name,password,email,role)");
      }
    
      const result = await addUserToDb(
        user.name,
        user.password,
        user.email,
        user.role
        
      )

      if (!result.success) {
        return sendError(500, result.message || "Failed to add User");
      }
    

    return sendResponse(200, "User added successfully!");
  } catch (error) {
    console.error("Handler error:", error.message);
    return sendError(500, "Internal server error.");
  }
};

// ******** koden skriven av Peter ***********