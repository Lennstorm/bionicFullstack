const validateUser = (schema) => ({
    before: (request) => {
        const { error } = schema.validate(request.event.body);
        if (error) {
            throw new Error(JSON.stringify({ status: 400, message: error.details[0].message})); // Detta fångas och returneras som ett fel
        }
    },
});

module.exports = { validateUser };

/* 
* Författare Andreas
*
*
*
*
 */