module.exports = async (req, res, next) => {
    // const { email, name, password } = req.body;
    const {
        username,
        name,
        email,
        password,
        confirmPassword,
        country,
        address
    } = req.body;

    // check if email provided is valid
    function validEmail(userEmail) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    if (req.path === "/register") {
        console.log(!email.length);
        if (![email, username, password, confirmPassword, country, address, role].every(Boolean)) {
            // unauthenticated
            return res.status(401).json("Missing Credentials");
        } else if (!validEmail(email)) {
            return res.status(401).json("Invalid Email");
        }
    } else if (req.path === "/login") {
        if (![username, password].every(Boolean)) {
            return res.status(401).json("Missing Credentials");
        }
    }

    // Continue on with the route
    next();
};