const jwt = require("jsonwebtoken");

// Check if JWT is valid
module.exports = async (req, res, next) => {
    try {
        const jwtToken = req.header("token");

        if(!jwtToken) {
            return res.status(403).json("User not authorized");
        }

        // See jwtGenerator for payload details
        const payload  = jwt.verify(jwtToken, process.env.jwtSecret);
        req.userId = payload.userId;
        next();
    } catch(err) {
        console.error(err.message);
        return res.status(403).json("User not authorized");
    }
}
