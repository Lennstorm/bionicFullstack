const middy = require('@middy/core');
const { jsonBodyParser } = require('@middy/http-json-body-parser');
const bcrypt = require('bcrypt');
const { sendError, sendResponse } = require('../../responses/index.js');
const { addUserToDb } = require('../utils/addUsersToDb.js');
const { validateRequest } = require('../../middleware/validateRequest.js');
const userSchema = require('../../schemas/userSchema.js');

const baseHandler = async (event) => {

  try {
    const user = event.body;

    user.role = 'kund';

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    const result = await addUserToDb(user);

    if (!result.success) {
      return sendError(500, result.message || 'Failed to add user');
    }

    return sendResponse(200, 'User added successfully!');
  } catch (error) {
    console.error('Handler error', error.message);
    return sendError(500, error.message || 'Internal server error.');
  }
};

module.exports.handler = middy(baseHandler)
  .use(jsonBodyParser())
  .use(validateRequest(userSchema))
  .onError((handler) => {
    const { error } = handler;
    console.error('Error in handler:', error.message);
    handler.response = sendError(400, error.message);
    return handler.callback(null, handler.response);
  });


/* 
GAMLA KODEN:

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
}; */

// ******** koden skriven av Peter ***********