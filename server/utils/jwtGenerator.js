const jwt = require("jsonwebtoken");
require(`dotenv`).config();

function jwtGenerator(user_id) {
    const payload = {
        user: user_id
    }
    
    return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
}

// exports the function within this js file
module.exports = jwtGenerator;