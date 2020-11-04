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

router.get("/petsinfo", async (req, res) => {
  try {
    const result = await Admin.getPetTypesByMonth();
    res.json({ count: result.rowCount, data: result.rows });
  } catch (error) {
    console.error("Could not obtain pet info", error);
    res.status(404).json({ message: "Get Pet Types of All Months error", error });
  }
});

module.exports = router;
