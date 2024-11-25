async function addBasketToDb(userID, menuItem, count, specialRequest, orderStatus) {
    try {
        const existingBasket = await db.scan({
            TableName: "basket-db",
            FilterExpression: "userID = :userID",
            ExpressionAttributeValues: {
                ":userID": userID,
            },
        });

        let basketID;
        if (existingBasket.Items && existingBasket.Items.length > 0) {
            basketID = existingBasket.Items[0].basketID;
        } else {
            basketID = uuid().substring(0, 8);
        }

        const basketItemID = uuid().substring(0, 8);

        await db.put({
            TableName: "basket-db",
            Item: {
                userID,
                basketID,
                basketItemID,
                menuItem,
                count,
                specialRequest,
                addedAt: new Date().toISOString(),
                orderStatus,
            },
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                message: "Item added to the basket successfully.",
                basketID,
            }),
        };
    } catch (error) {
        console.error("Error adding to basket:", error);
        throw new Error("Failed to add item to basket.");
    }
}



/*
Alistair
*/