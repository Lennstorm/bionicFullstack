//bionicBackend/src/responses/index.js:

function sendResponse(status, data) {
  return {
    statusCode: status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Tillåter alla domäner
      "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE", // Tillåtna metoder
      "Access-Control-Allow-Headers": "Content-Type", // Tillåtna headers
    },
    body: JSON.stringify({ success: true, data }),
  };
}

function sendError(status, message) {
  return {
    statusCode: status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: JSON.stringify({ success: false, message: message }),
  };
}

function sendResponseWithHeaders(statusCode, body, token) {
  const response = {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json',
      //'Authorization': `Bearer ${token}`,
      // 'Set-Cookie': `token=${token}; Max-Age=3600, HttpOnly; Path=/`
    },
    body: JSON.stringify({
      data: body,
      token: token,
    }),
  };
  console.log('Response not being sent:', response);
  return response;
};

module.exports = { sendResponse, sendError, sendResponseWithHeaders };


/* Författare Peter
*
* Tillägg av Andreas - function sendResponseWithHeaders
*
*
*
 */
