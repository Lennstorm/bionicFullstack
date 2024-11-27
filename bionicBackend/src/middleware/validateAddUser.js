const validateUser = (schema) => ({
    before: (handler) => {
        const { error } = schema.validate(handler.event.body);
        if (error) {
            throw new Error(JSON.stringify({ status: 400, message: error.details[0].message})); // Detta fångas och returneras som ett fel
        }
    },
});

module.exports = { validateUser };