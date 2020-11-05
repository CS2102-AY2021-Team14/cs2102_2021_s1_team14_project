const express = require("express");
const router = express.Router();

// Middleware
const bcrypt = require("bcrypt");
const pool = require("../db/dbPool");
const jwtGenerator = require("../utils/jwtGenerator");
const validator = require("../utils/validator");
const authorization = require("../utils/authorization");
const { Pool } = require("pg");

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
      address,
      role,
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(401).json("Please make sure your passwords match!");
    }

    // Check if user exist, if yes, throw error
    const user = await pool.query(
      `SELECT * FROM users 
            WHERE user_email = $1 OR user_name = $2`,
      [email, username]
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
            ) RETURNING user_name`,
      [username, name, email, bcryptPassword, country, address]
    );

    if (role === "PCS Admin") {
      await pool.query("INSERT INTO pcs_admins VALUES ($1)", [username]);
    } else if (role === "Pet Owner") {
      await pool.query("INSERT INTO pet_owners VALUES ($1)", [username]);
    } else if (role === "Full-time Care Taker") {
      await pool.query(
        "INSERT INTO care_takers (user_name, is_part_time) VALUES ($1, $2)",
        [username, false]
      );
    } else if (role === "Part-time Care Taker") {
      await pool.query(
        "INSERT INTO care_takers (user_name, is_part_time) VALUES ($1, $2)",
        [username, true]
      );
    }

    // Generate jwt
    const token = jwtGenerator(newUser.rows[0].user_name);

    res.json({ token, username, role });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

// Login Route
router.post("/login", validator, async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await pool.query(`SELECT * FROM users WHERE user_name = $1`, [
      username,
    ]);

    // Check if user exists
    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Username");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Wrong Password");
    }

    const token = jwtGenerator(user.rows[0].user_name);

    const roles = [];
    const rolesQuery = await pool.query(
      `SELECT role, is_part_time FROM user_roles WHERE user_name = $1`,
      [username]
    );

    const fullRoleString = rolesQuery.rows[0].role;
    const isPartTime = rolesQuery.rows[0].is_part_time;
    if (fullRoleString != null && fullRoleString.includes("Pet Owner")) {
      roles.push("Pet Owner");
    }
    if (fullRoleString != null && fullRoleString.includes("PCS Admin")) {
      roles.push("PCS Admin");
    }
    if (fullRoleString != null && fullRoleString.includes("Care Taker")) {
      roles.push(isPartTime ? "Part-time Care Taker" : "Full-time Care Taker");
    }

    res.json({ token, username, roles });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

// Verification that happens every app refresh
router.get("/is-verify", authorization, async (req, res) => {
  try {
    // If authorization check passed, user is authorized
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
