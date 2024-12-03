const { sendError } = require('../responses/index'); // Import sendError function

// Middleware function to validate userID in the query parameters
const validateGetUserBasket = () => {
    return {
        before: async (handler) => {
            const userID = handler.event.queryStringParameters?.userID;

            console.log('Incoming event:', handler.event);

            if (!userID || typeof userID !== 'string' || userID.trim() === '') {
                handler.response = sendError(400, 'Invalid userID. It must be a non-empty string.');
                return;
            }

            // Additional validation can be added here (e.g., schema validation)
        },
        after: async (handler) => {
            // Optionally log the response
            console.log('Response:', handler.response);
        },
        onError: async (handler) => {
            // Handle unexpected errors
            console.error('Error caught in middleware:', handler.error);
            handler.response = sendError(500, 'Internal Server Error');
        },
    };
};

module.exports = validateGetUserBasket;




