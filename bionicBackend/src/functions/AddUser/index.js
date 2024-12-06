const middy = require('@middy/core');
const bcrypt = require('bcryptjs');
const { sendError, sendResponse } = require('../../responses/index.js');
const { addUserToDb, checkIfEmailExists } = require('../utils/addUsersToDb.js');
const { validateUser } = require('../../middleware/validateAddUser.js');
const userSchema = require('../../schemas/userSchema.js');

let jsonBodyParser;

(async () => {
  const module = await import('@middy/http-json-body-parser');
  jsonBodyParser = module.default;
})();

const baseHandler = async (event) => {
  try {
    const user = event.body;

    const existingUser = await checkIfEmailExists(user.email);
    if (existingUser) {
      return sendError(400, 'Email is already registered');
    }

    user.role = 'kund';

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    const result = await addUserToDb(user);

    if (!result.success) {
      return sendError(500, result.message || 'Failed to add user');
    }

    return sendResponse(201, 'User added successfully!');
  } catch (error) {
    console.error('Handler error:', error.message);
    return sendError(500, error.message || 'Internal server error.');
  }
};

// För att säkerställa att jsonBodyParser laddas korrekt
module.exports.handler = async (event, context) => {
  if (!jsonBodyParser) {
    const module = await import('@middy/http-json-body-parser');
    jsonBodyParser = module.default;
  }

  const handler = middy(baseHandler)
    .use(jsonBodyParser())
    .use(validateUser(userSchema))
    .onError((handler) => {
      const { error } = handler;

      if (error.message) {
        try {
          const errorObj = JSON.parse(error.message);
          if (errorObj.status === 400) {
            handler.response = sendError(400, errorObj.message);
            return;
          }
        } catch {

        }
      }

      handler.response = sendError(500, 'Internal server error.');
    });


  return handler(event, context);
};


/*
* Författare Peter
*
* Omgjord av Andreas för Middy; Joi; Bcrypt/hash av password; automatiskt tilldelande av role "kund";
*
*
 */



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