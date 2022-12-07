const argon2 = require("argon2");

module.exports.hash = async (text) => {
    return await argon2.hash(text);
}

module.exports.verify = async (text, hashedText) => {
    return await argon2.verify(hashedText, text);
}