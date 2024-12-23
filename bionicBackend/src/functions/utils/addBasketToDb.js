//bionicBackend/src/functions/utils/addBasketToDb.js
const { db } = require("../../services/index.js");

async function addBasketToDb({userID, basketItems}) {
    
    if (!userID || !basketItems || !basketItems.length) {
        throw new Error('Missing required parameters');
    }
    
    try {
        const basketItemID = `basket-${userID}`;

        const getParams = {
            TableName: "basket-db",
            Key: {
                basketItemID,
                userID,
            },
        };

        //finns det redan en korg?
        const existingBasket = await db.get(getParams);
        console.log('det här är en log i utils om existingBasket',existingBasket)

        if (existingBasket.Item) {
            const existingItems = existingBasket.Item.basketItems;

            const updatedBasketItems = existingItems.map(existingItem => {
                const matchingNewItem = basketItems.find(
                    newItem => newItem.menuItem === existingItem.menuItem
                );

                if (matchingNewItem) {
                    return {
                        ...existingItem,
                        count: existingItem.count + matchingNewItem.count,
                        specialRequests: matchingNewItem.specialRequests || existingItem.specialRequests,
                    };
                }
                return existingItem;
            });

            const newItems = basketItems.filter(
                newItem => !existingItems.some(existingItem => existingItem.menuItem === newItem.menuItem)
            );

            const finalBasketItems = [...updatedBasketItems, ...newItems];

            const updateParams = {
                TableName: "basket-db",
                Key: {
                    basketItemID,
                    userID,
                },
                UpdateExpression: "SET basketItems = :basketItems",
                ExpressionAttributeValues: {
                    ":basketItems": finalBasketItems,
                },
            };
            await db.update(updateParams);

            return {
                success: true,
                message: "Basket updated successfully",
            };
        } else {
            const newBasket = {
                basketItemID,
                userID,
                basketItems,
                createdAt: new Date().toISOString(),
            };
             console.log('här är vi i utils och kollar på basketItems',basketItems)
            const putParams = {
                TableName: "basket-db",
                Item: newBasket,
            };

            await db.put(putParams);

            return {
                success: true,
                message: "Basket created successfully",
            };
        }
    } catch (error) {
        console.error("Error in addBasketToDb:", error.message);
        return {
            success: false,
            message: error.message,
        };
    }
}

module.exports = { addBasketToDb };


/*
Alistair
*/