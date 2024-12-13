// /bionicBackend/src/middleware/errorHandler.js

//const { sendResponse } = require("../responses/index.js");

const cspHeader = "default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; object-src 'none'; img-src 'self' https://group-img-restaurant.s3.eu-north-1.amazonaws.com;";

const errorHandler = () => ({
    onError: (request) => {
      console.error('Error stack:', request.error.stack || request.error.message);
      console.error('Event details:', JSON.stringify(request.event, null, 2));
  
      const statusCode = request.error.statusCode || 500;
      const message = request.error.message || 'Internt serverfel.';
      request.response = {
        statusCode,
        headers: { 
          'Content-Type': 'application/json',
          'Content-Security-Policy' : cspHeader,
         },
        body: JSON.stringify({ success: false, message }),
      };
  
      // Avsluta middleware-kedjan
      return Promise.resolve();
    },
  });
  
  module.exports = { errorHandler };

  /* 
  * Författare Andreas
  *
  * 
  * 
  *  */