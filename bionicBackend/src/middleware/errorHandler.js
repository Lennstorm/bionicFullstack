//const { sendResponse } = require("../responses/index.js");

const errorHandler = () => ({
    onError: (handler) => {
        console.error("Error stack:", handler.error.stack || handler.error.message);
        console.error("Event details:", JSON.stringify(handler.event, null, 2));

        const statusCode = handler.error.statusCode || 500;
        const message = handler.error.message || "Internal server error.";
        handler.response = {
            statusCode,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ success: false, message }),
        };
    },
});

module.exports = { errorHandler };