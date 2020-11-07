const express = require("express");
const router = express.Router();

const PetOwner = require("../db/petowner");

router.post("/obsession", async (req, res) => {
  try {
    const { owner } = req.body;
    const result = await PetOwner.obsessed(owner);
    res.status(200).json({ result: result.rows });
  } catch (error) {
    console.error("Could not obtain obsession info", error);
    res.status(404).json({ message: "Get Obsession error", error });
  }
});

module.exports = router;
