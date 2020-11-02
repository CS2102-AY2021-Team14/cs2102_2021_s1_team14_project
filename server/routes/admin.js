const express = require("express");
const router = express.Router();

const Admin = require("../db/admin");

router.get("/underperforming", async (req, res) => {
  try {
    const result = await Admin.getUnderperforming();

    res.json({ count: result.rowCount, data: result.rows });
  } catch (error) {
    console.error("Error getting underperforming", error);

    res.status(404).json({ message: "Underperforming request error", error });
  }
});

router.get("/employeeofmonth", async (req, res) => {
  try {
    const result = await Admin.getEmployeeOfMonth();

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error getting employee of the month", error);

    res.status(404).json({ message: "Employee of the month request error", error });
  }
});

module.exports = router;
