const { schema } = require("../schemas/orderSchema");

const validateOrder = () => {
    return {
        before: async (handler) => {
            const { body } = handler.event;

            console.log("Original body received:", body);

            let eventBody = body;
            if (typeof body === "string") {
                try {
                    eventBody = JSON.parse(body);
                } catch (error) {
                    throw new Error("Invalid JSON body.");
                }
            }

            console.log("Parsed body used for validation:", eventBody);

            const { error } = schema.validate(eventBody);
            if (error) {
                throw new Error(error.details[0].message);
            }

            handler.event.validatedOrder = eventBody;
        }
    };
};;

module.exports = { validateOrder };








