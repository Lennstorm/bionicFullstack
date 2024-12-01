// bionicBackend/src/services/getUserByEmail.js:

const { db } = require("../services/index.js");

const getUserByEmail = async (email) => {
  try {
    console.log('Fetching user with email:', email);
    const params = {
      TableName: 'user-db',
      IndexName: 'email-index',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    };

    const { Items } = await db.query(params);

    return Items[0] || null;
  } catch (error) {
    console.error("Error fetching user by email:", error.message);
    throw new Error("Database error while fetching user by email");
  }
};

module.exports = { getUserByEmail };
