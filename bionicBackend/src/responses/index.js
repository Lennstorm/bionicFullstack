function sendResponse(status, data) {
  return {
    statusCode: status,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ success: true, data }),
  };
}

function sendError(status, message) {
  return {
    statusCode: status,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ success: false, message: message }),
  };
}

function sendResponseWithHeaders(statusCode, body, token) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      // 'Set-Cookie': `token=${token}; Max-Age=3600, HttpOnly; Path=/`
    },
    body: JSON.stringify({
      data: body
    }),
  };
};

module.exports = { sendResponse, sendError, sendResponseWithHeaders };


/* Författare Peter
*
* Tillägg av Andreas - function sendResponseWithHeaders
*
*
*
 */
