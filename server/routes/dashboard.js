const express = require("express");
const router = express.Router();

const pool = require("../db/dbPool");
const authorization = require("../utils/authorization");

// Get dashboard depending on user_role
router.get("/", authorization, async (req, res) => {
    try {
        const user = await pool.query(
            `SELECT user_name, user_role FROM users WHERE user_id = $1`,
            [
                req.userId
            ]
        );

        res.json(user.rows[0]);
    } catch (error) {
        console.error(err.message);
        res.status(500).json("Server error");
    }
});


module.exports = router;