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

    res
      .status(404)
      .json({ message: "Employee of the month request error", error });
  }
});

router.get("/petsinfo", async (req, res) => {
  try {
    const result = await Admin.getPetTypesByMonth();
    res.json({ count: result.rowCount, data: result.rows });
  } catch (error) {
    console.error("Could not obtain pet info", error);
    res
      .status(404)
      .json({ message: "Get Pet Types of All Months error", error });
  }
});

router.get("/basedailyprices", async (req, res) => {
  try {
    const result = await Admin.getBaseDailyPrices();
    res.json({ count: result.rowCount, data: result.rows });
  } catch (error) {
    console.error("Could not obtain base daily prices", error);
    res.status(404).json({ message: "Get base daily price error", error });
  }
});

router.post("/basedailyprices", async (req, res) => {
  try {
    const { pet_type, base_price } = req.body;

    const result = await Admin.insertBaseDailyPrice(pet_type, base_price);
    res.status(201).json({
      message: `Successfully added ${pet_type} with base price ${base_price}`,
    });
  } catch (error) {
    console.error("Could not insert base daily prices", error);
    res.status(404).json({ message: "Add base daily price error", error });
  }
});

router.put("/basedailyprices", async (req, res) => {
  try {
    const { pet_type, base_price } = req.body;

    const result = await Admin.updateBaseDailyPrice(pet_type, base_price);
    res.status(201).json({
      message: `Successfully updated ${pet_type} with base price ${base_price}`,
    });
  } catch (error) {
    console.error("Could not update base daily prices", error);
    res.status(404).json({ message: "Update base daily price error", error });
  }
});

router.delete("/basedailyprices/:pettype", async (req, res) => {
  try {
    const pet_type = req.params.pettype;

    const result = await Admin.deleteBaseDailyPrice(pet_type);
    res.status(200).json({
      message: `Successfully deleted base price of ${pet_type}`,
    });
  } catch (error) {
    console.error("Could not delete base daily price", error);
    res.status(404).json({ message: "Delete base daily price error", error });
  }
});

router.put("/updateEmployee", async (req, res) => {
  try {
    const { name, email, addr, username } = req.body;
    const result = await Admin.updateEmployeeInfo(name, email, addr, username);
    res.status(200).json({
      message: `Successfully updated Employee ${username}`
    })
  } catch (error) {
    console.error("Could not update employee", error);
    res.status(404).json({ message: "Update employee error", error });
  }
});

router.get("/employees", async (req, res) => {
  try {
    const result = await Admin.getEmployees();
    res.status(200).json({
      message: `Employee data fetch successful`,
      employeesInfo: result.rows
    })
  } catch (error) {
    console.error("Could not get employees");
    res.status(404).json({ message: "Could not get employees from database", error });
  }
});

router.get(`/salary/:username/:month/:year`, async (req, res) => {
  const username = req.params.username;
  const month = req.params.month;
  const year = req.params.year;
  try {
    const result = await Admin.getEmployeePricesForMonth(username, month, year);
    console.log(result);
    res.status(200).json({
      message: `Data fetch success`,
      data: result.rows
    })
  } catch (error) {
    console.error(`Could not get ${username}'s salary`);
    res.status(404).json({
      message: "Could not fetch month year price info",
      error
    });
  }
});

router.get("/checkpay/:username/:month/:year", async (req, res) => {
  const username = req.params.username;
  const month = req.params.month;
  const year = req.params.year;
  try {
    const result = await Admin.getSalaryInfoForMonth(username, month, year);
    console.log(result);
    res.status(200).json({
      message: `Successful retrieve of ${username} salary`,
      data: result.rows
    })
  } catch (error) {
    console.error(`Could not get ${username}'s salary`);
    res.status(404).json({
      message: `Failed fetching salary data from server`,
      error
    })
  }
})

module.exports = router;
