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

router.get("/:owner", async (req, res) => {
  try {
    const result = await Pets.getPetsOfOwner(req.params.owner);

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: `Pets from owner ${req.params.owner} not found`,
      });
    }

    res.json({ count: result.rowCount, data: result.rows });
  } catch (error) {
    console.error(`Error getting pets from owner ${req.params.owner}`, error);

    res.status(404).json({
      message: `Pets from owner ${req.params.owner} not found`,
      error,
    });
  }
});

router.get("/:owner/:name", async (req, res) => {
  try {
    const result = await Pets.get(req.params.name, req.params.owner);

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: `Pet ${req.params.name} from owner ${req.params.owner} not found`,
      });
    }

    res.json({ count: result.rowCount, data: result.rows[0] });
  } catch (error) {
    console.error(
      `Error getting pet ${req.params.name} from owner ${req.params.owner}`,
      error
    );

    res.status(404).json({
      message: `Pet ${req.params.name} from owner ${req.params.owner} not found`,
      error,
    });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { name, owner, type } = req.body;
    const result = await Pets.add(name, owner, type);

    res.status(201).send({ count: result.rowCount });
  } catch (error) {
    console.error("Error posting new pet", error);

    res.status(400).json({ message: "Error posting new pet", error });
  }
});

router.put("/:owner/:name", async (req, res) => {
  try {
    const { name: newName, type: newType } = req.body;
    const result = await Pets.put(
      req.params.name,
      req.params.owner,
      newName,
      newType
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: `Error changing pet ${req.params.name} from ${req.params.owner}`,
      });
    }

    console.log(result.rowCount);

    res.status(200).send({
      message: `Successfully changed pet ${req.params.name} from ${req.params.owner} to ${newName} and type ${newType}`,
    });
  } catch (error) {
    console.error("Error deleting pet", error);
    res.status(400).json({
      message: `Error changing pet ${req.params.name} from ${req.params.owner}`,
      error,
    });
  }
});

router.delete("/:owner/:name", async (req, res) => {
  try {
    const result = await Pets.delete(req.params.name, req.params.owner);

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: `Error deleting pet ${req.params.name} from ${req.params.owner}`,
      });
    }
    res.status(200).send({
      message: `Successfully deleted pet ${req.params.name} from ${req.params.owner}`,
    });
  } catch (error) {
    console.error("Error deleting pet", error);
    res.status(400).json({
      message: `Error deleting pet ${req.params.name} from ${req.params.owner}`,
      error,
    });
  }
});

router.post("/:owner/:name/requirement", async (req, res) => {
  try {
    const { requirement, description } = req.body;
    const result = await Pets.addSpecialRequirement(
      req.params.name,
      req.params.owner,
      requirement,
      description
    );

    res.status(201).send({
      message: `Successfully added ${requirement} and ${description} to pet ${req.params.name} from ${req.params.owner}`,
    });
  } catch (error) {
    console.error("Error adding special requirement", error);

    res
      .status(400)
      .json({ message: "Error adding special requirement", error });
  }
});

module.exports = router;
