const express = require("express");
const router = express.Router();

// Middleware
const bcrypt = require("bcrypt");
const pool = require("../db/dbPool");
const jwtGenerator = require("../utils/jwtGenerator");
const validator = require("../utils/validator");
const authorization = require("../utils/authorization");

// Registration
router.post("/register", validator, async (req, res) => {
    try {
        // Destructure the req body
        const {
            username,
            name,
            email,
            password,
            confirmPassword,
            country,
            address
        } = req.body;

        if (password !== confirmPassword) {
            return res.status(401).json("Please make sure your passwords match!");
        }

        // Check if user exist, if yes, throw error
        const user = await pool.query(
            `SELECT * FROM users 
            WHERE user_email = $1 OR user_name = $2`,
            [
                email,
                username
            ]
        );

        // User already exists
        if (user.rows.length !== 0) {
            return res.status(401).json("Username or email already exist");
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            `INSERT INTO users (
                user_name,
                name, 
                user_email, 
                user_password, 
                user_country,
                user_address
            ) VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6
            ) RETURNING *`,
            [
                username,
                name,
                email,
                bcryptPassword,
                country,
                address
            ]
        );

        // Generate jwt
        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");
    }
});

// Login Route
router.post("/login", validator, async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await pool.query(
            `SELECT * FROM users WHERE user_name = $1`,
            [
                username
            ]
        );

        // Check if user exists
        if (user.rows.length === 0) {
            return res.status(401).json("Invalid Username");
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if (!validPassword) {
            return res.status(401).json("Wrong Password");
        }

        const token = jwtGenerator(user.rows[0].user_id);
        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error")
    }
});

// Verification that happens every app refresh
router.get("/is-verify", authorization, async (req, res) => {
    try {
        // If authorization check passed, user is authorized
        res.json(true);
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;