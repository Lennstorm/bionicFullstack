//bionicBackend/src/middleware/validateAddBasket.js
const { schema } = require("../schemas/basketSchema");

const validateAddBasket = () => {
    return {
        before: async (handler) => {
            const { body } = handler.event;

            let eventBody;
            try {
                eventBody = JSON.parse(body);
            } catch (error) {
                throw new Error("Invalid JSON body.");
            }

            const { error } = schema.validate(eventBody);
            if (error) {
                throw new Error(error.details[0].message);
            }

            handler.event.basket = eventBody;
        }
    };
};

module.exports = { validateAddBasket };



/*
Alistair
Peter
*/


