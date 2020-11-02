const express = require("express");
const router = express.Router();

const Caretaker = require("../db/caretaker");

router.get("/", async (req, res) => {
  try {
    const result = await Caretaker.getAll();

    res.status(200).json({ count: result.rowCount, data: result.rows });
  } catch (error) {
    console.error("Error getting all caretakers", error);

    res.status(404).json({ message: "Error getting all caretakers", error });
  }
});

router.get("/:username", async (req, res) => {
  try {
    const result = await Caretaker.getCaretaker(req.params.username);

    if (result.rowCount === 0) {
      return res.status(404).send({
        message: `Caretaker ${req.params.username} does not exist`,
      });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(`Error getting caretaker ${req.params.username}`, error);

    res.status(404).json({
      message: `Error getting caretaker ${req.params.username}`,
      error,
    });
  }
});

router.get("/:username/leaves", async (req, res) => {
  try {
    const result = await Caretaker.getLeaves(req.params.username);

    // If caretaker did not take leave, this would be empty
    res.status(200).json({ count: result.rowCount, data: result.rows });
  } catch (error) {
    console.error(
      `Error getting leaves of caretaker ${req.params.username}`,
      error
    );

    res.status(404).json({
      message: `Error getting leaves of caretaker ${req.params.username}`,
      error,
    });
  }
});

router.post("/:username/leaves", async (req, res) => {
  try {
    const { leave_date } = req.body;
    const date = new Date(leave_date);
    const result = await Caretaker.addLeave(req.params.username, date);

    if (result.rowCount === 0) {
      return res.status(404).send({
        message: `Error adding leave of caretaker ${req.params.username} (check the trigger)`,
      });
    }

    res.status(200).send({
      message: `Successfully added ${leave_date} to caretaker ${req.params.username}`,
    });
  } catch (error) {
    console.error(
      `Error adding leave of caretaker ${req.params.username}`,
      error
    );

    res.status(404).json({
      message: `Error adding leave if caretaker ${req.params.username}`,
      error,
    });
  }
});

router.get("/:username/jobs", async (req, res) => {
  try {
    const result = await Caretaker.getJobs(req.params.username);

    if (result.rowCount === 0) {
      return res.status(404).send({
        message: `Caretaker ${req.params.username} does not exist`,
      });
    }

    res.status(200).json({ count: result.rowCount, data: result.rows });
  } catch (error) {
    console.error(
      `Error getting jobs of caretaker ${req.params.username}`,
      error
    );

    res.status(404).json({
      message: `Error getting jobs of caretaker ${req.params.username}`,
      error,
    });
  }
});

router.get("/:username/salary", async (req, res) => {
  try {
    const result = await Caretaker.getSalary(req.params.username);

    res.status(200).json({ count: result.rowCount, data: result.rows });
  } catch (error) {
    console.error(
      `Error getting salary of caretaker ${req.params.username}`,
      error
    );

    res.status(404).json({
      message: `Error getting salary of caretaker ${req.params.username}`,
      error,
    });
  }
});

router.get("/:username/ratings", async (req, res) => {
  try {
    const result = await Caretaker.getRatings(req.params.username);

    if (result.rowCount === 0) {
      return res.status(404).send({
        message: `Ratings for caretaker ${req.params.username} does not exist`,
      });
    }

    res.status(200).json({ count: result.rowCount, data: result.rows });
  } catch (error) {
    console.error(
      `Error getting ratings of caretaker ${req.params.username}`,
      error
    );

    res.status(404).json({
      message: `Error getting ratings of caretaker ${req.params.username}`,
      error,
    });
  }
});

router.get("/:username/avgrating", async (req, res) => {
  try {
    const result = await Caretaker.getAvgRating(req.params.username);

    if (result.rowCount === 0) {
      return res.status(404).send({
        message: `Average rating for caretaker ${req.params.username} does not exist`,
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(
      `Error getting average rating of caretaker ${req.params.username}`,
      error
    );

    res.status(404).json({
      message: `Error getting average rating of caretaker ${req.params.username}`,
      error,
    });
  }
});

router.post("/:username/pettype", async (req, res) => {
  try {
    const { pet_type } = req.body;
    const result = await Caretaker.addPetType(req.params.username, pet_type);

    if (result.rowCount === 0) {
      return res.status(404).send({
        message: `Caretaker ${req.params.username} does not exist`,
      });
    }

    res.status(201).send({
      message: `Successfully added pet type ${pet_type} to care taker ${req.params.username}`,
    });
  } catch (error) {
    console.error(
      `Error adding pet type to care taker ${req.params.username}`,
      error
    );

    res.status(404).json({
      message: `Error adding pet type to care taker ${req.params.username}`,
      error,
    });
  }
});

router.delete("/:username/pettype", async (req, res) => {
  try {
    const { pet_type } = req.body;
    const result = await Caretaker.removePetType(req.params.username, pet_type);

    if (result.rowCount === 0) {
      return res.status(404).send({
        message: `Caretaker ${req.params.username} does not exist`,
      });
    }

    res.status(200).send({
      message: `Successfully removed pet type ${pet_type} from care taker ${req.params.username}`,
    });
  } catch (error) {
    console.error(
      `Error removing pet type from care taker ${req.params.username}`,
      error
    );

    res.status(404).json({
      message: `Error removing pet type from care taker ${req.params.username}`,
      error,
    });
  }
});


module.exports = router;
