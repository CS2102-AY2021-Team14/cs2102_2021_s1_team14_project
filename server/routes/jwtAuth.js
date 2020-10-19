// const router = require("express").Router();
// const pool = require("../db/dbPool.js");

// // Middlewares
// const bcrypt = require("bcrypt");
// const jwtGenerator = require("../utils/jwtGenerator.js");
// const validInfo = require("../middleware/validInfo.js");
// const authorization = require("../middleware/authorization.js");

// // Registration routes
// router.post("/register", validInfo, async(req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         const user = await pool.query("SELECT * FROM users WHERE user_email = $1",
//             [
//                 email
//             ]
//         );

//         if (user.rows.length !== 0) {
//             return res.status(401).send("User already exist");
//         } 

//         const saltRound = 10;
//         const salt = await bcrypt.genSalt(saltRound);
//         const bcryptPassword = await bcrypt.hash(password, salt);

//         // enter the new user inside the database  
//         const newUser = await pool.query(
//             `INSERT INTO users (user_name, user_email, user_password) 
//             VALUES ($1, $2, $3) RETURNING *`,
//             [
//                 name,
//                 email,
//                 bcryptPassword
//             ]
//         );

//         const token = jwtGenerator(newUser.rows[0].user_id);
//         res.json({ token });
//     } catch(err) {
//         console.error(err.message);
//         res.status(500).send("Server error");
//     }
// });


// // Login route
// router.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // check if the user doesn't exist, if doesnt then throw error
//         const user = await pool.query(
//             `SELECT * FROM users WHERE user_email = $1`, [
//                 email
//         ]);

//         if (user.rows.length == 0) {
//             return res.status(401).json("Password or Email is incorrect");
//         }

//         const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

//         if (!validPassword) {
//             return res.status("Password or email is incorrect")
//         }

//         const token = jwtGenerator(
//             user.rows[0].user_id
//         );

//         res.json({ token });
//     } catch(err) {
//         console.error(err.message);
//         res.status(500).send("Server error");
//     }
// });

// // Private router for app refresh verification
// router.get("/is-verify", authorization, async (req, res) => {
//     try {
//         // token passes the test, person is authenticated
//         res.json(true);
//     } catch(err) {
//         console.error(err.message);
//         res.status(500).send("Server error");
//     }
// });

// module.exports = router;