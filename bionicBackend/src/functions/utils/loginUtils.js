//bionicBackend/src/functions/utils/loginUtils.js

//const { sendResponse } = require("../../responses/index.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const saltRounds = 10;

const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

const comparePasswords = async (password, storedPassword) => {
    const isEqual = await bcrypt.compare(password, storedPassword);
    return isEqual;
};

const generateJWT = (user) => {
    const payload = {
        userid: user.userid,
        isAdmin: user.role === "admin" || false,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    return token;
};

const verifyJWT = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return decoded;
    } catch (error) {
        console.error("Invalid token:", error.message);
        return null;
    }
};

module.exports = { hashPassword, comparePasswords, generateJWT, verifyJWT };