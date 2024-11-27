const { db } = require("../../services/index.js");
const { v4: uuid } = require("uuid");

async function addUserToDb(user) {
    const userid = uuid().substring(0, 8)
    
    try {
        await db.put({
            TableName: "user-db",
            Item: {
                userid,
                name: user.name,
                password: user.password,
                email: user.email,
                role: user.role,
          }
        });
        return {
            success: true,
            message: "user added successfully",
        };
    } catch (error) {
        return {
            success: false, message: error.message
        };
    }
}

async function checkIfEmailExists(email) {
    try {
        const result = await db.query({
            TableName: 'user-db',
            IndexName: 'email-index', // GSI måste specificeras här
            KeyConditionExpression: '#email = :email',
            ExpressionAttributeNames: {
                '#email': 'email', // Eftersom "email" är reserverat
            },
            ExpressionAttributeValues: {
                ':email': email,
            },
        });

        return result.Items && result.Items.length > 0;
    } catch (error) {
        console.error('Error checking email:', error.message);
        if (error.message.includes('Database error')) {
            throw new Error('Internal server error while checking email');
        }
        throw error;
    }
}

module.exports = { addUserToDb, checkIfEmailExists };


/* 
* Författare Peter
*
* Tillägg av Andreas för funktion med Middy, kontroll för att inte registrera redan registrerad epost.
*
*
 */