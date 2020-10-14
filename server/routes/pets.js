const express = require("express");
const router = express.Router();

const Pets = require("../db/pets");

router.get("/", async (req, res) => {
  try {
    const result = await Pets.getAll();

    res.json({ count: result.rowCount, data: result.rows });
  } catch (error) {
    console.error("Error getting pets", error);

    res.status(404).json({ message: "Pets not found", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Pets.get(req.params.id);

    res.json({ count: result.rowCount, data: result.rows[0] });
  } catch (error) {
    console.error(`Error getting pet ${req.params.id}`, error);

    res.status(404).json({ message: `Pet ${req.params.id} not found`, error });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await Pets.add(req.body);

    res.status(201).send({ count: result.rowCount });
  } catch (error) {
    console.error("Error posting new pet", error);

    res.status(400).json({ message: "Error posting new pet", error });
  }
});

// TODO: other routes like put and delete

module.exports = router;
