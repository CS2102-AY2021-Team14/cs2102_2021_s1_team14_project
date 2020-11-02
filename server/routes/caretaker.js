const express = require("express");
const router = express.Router();

const Caretaker = require("../db/caretaker");

router.get("/", async (req, res) => {
  try {
    const result = await Caretaker.getAll();

    res.json({ count: result.rowCount, data: result.rows });
  } catch (error) {
    console.error("Error getting all caretakers", error);

    res.status(404).json({ message: "Caretakers not found", error });
  }
});

router.get("/:username", async (req, res) => {
  try {
    const result = await Caretaker.getCaretaker(req.params.username);

    res.json(result.rows);
  } catch (error) {
    console.error(`Error getting caretaker ${req.params.username}`, error);

    res.status(404).json({ message: `Caretakers ${req.params.username} not found`, error });
  }
});

module.exports = router;
