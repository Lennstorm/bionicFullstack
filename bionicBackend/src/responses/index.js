function sendResponse(status, data) {
  return {
    statusCode: status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Lägg till detta
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: JSON.stringify({ success: true, data }),
  };
}

function sendError(status, message) {
  return {
    statusCode: status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Lägg till detta
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
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
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




/*
//bionicBackend/src/responses/index.js:

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
