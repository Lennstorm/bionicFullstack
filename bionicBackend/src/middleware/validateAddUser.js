const validateUser = (schema) => ({
    before: async (handler) => {
        const { error } = schema.validate(handler.event.body);
        if (error) {
            throw new Error(error.details[0].message);
        }
    },
});

module.exports = { validateUser };