//bionicBackend/src/middleware/validateToken.js:

const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateToken = () => ({
  before: (request) => {
    const authHeader = request.event.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      const error = new Error('Token saknas');
      error.statusCode = 401;
      throw error;
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      request.event.user = decodedToken;
    } catch (error) {
      console.error('Ogiltigt token:', error.message);
      error.statusCode = 403;
      throw error;
    }
  },
});

module.exports = { validateToken };
