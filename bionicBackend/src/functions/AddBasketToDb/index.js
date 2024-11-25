const addBasketHandler = async (event) => {
    const { userID, basketItems } = JSON.parse(event.body);

    try {
        for (const item of basketItems) {
            const { menuItem, count, specialRequest, orderStatus } = item;

            const response = await addBasketToDb(userID, menuItem, count, specialRequest, orderStatus);
            if (response.statusCode !== 200) {
                throw new Error("Failed to add basket item.");
            }
        }

        return sendResponse(200, { success: true, message: "All items added to basket successfully." });

    } catch (error) {
        console.error("Handler error:", error);
        return sendError(500, { message: "An error occurred while processing the data." });
    }
};

