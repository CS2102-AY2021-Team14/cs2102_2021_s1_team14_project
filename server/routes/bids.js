const express = require("express");
const router = express.Router();

const Bids = require("../db/bids");

router.get("/", async (req, res) => {
  try {
    const result = await Bids.getAll();

    res.status(200).json({ count: result.rowCount, data: result.rows });
  } catch (error) {
    console.error("Error getting all bids", error);

    res.status(404).json({ message: "Error getting all bids", error });
  }
});

router.get("/active", async (req, res) => {
  try {
    const result = await Bids.getAllActive();

    res.status(200).json({ count: result.rowCount, data: result.rows });
  } catch (error) {
    console.error("Error getting all active bids", error);

    res.status(404).json({ message: "Error getting all active bids", error });
  }
});

router.post("/inactive", async (req, res) => {
  try {
    const { pet, care_taker, start_date, end_date } = req.body;
    const result = await Bids.setInactiveBid(
      pet,
      care_taker,
      new Date(start_date),
      new Date(end_date)
    );

    if (result.rowCount === 0) {
      return res.status(404).send({
        message: `Error setting inactive bid for pet ${pet} and care taker ${care_taker} from ${start_date} to ${end_date}`,
      });
    }

    res.status(200).send({
      message: `Successfully set inactive bid for pet ${pet} and care taker ${care_taker} from ${start_date} to ${end_date}`,
    });
  } catch (error) {
    console.error("Error setting inactive bid", error);

    res.status(404).json({ message: "Error setting inactive bids", error });
  }
});

router.post("/add", async (req, res) => {
  try {
    const {
      pet,
      owner,
      care_taker,
      pet_type,
      start_date,
      end_date,
    } = req.body;
    const result = await Bids.addBid(
      pet,
      owner,
      care_taker,
      pet_type,
      new Date(start_date),
      new Date(end_date),
    );

    if (result.rowCount === 0) {
      return res.status(404).send({
        message: `Error adding bid for pet ${pet} for owner ${owner} for care taker ${care_taker} \
                  from ${start_date} to ${end_date}`,
      });
    }

    res.status(201).send({
      message: `Successfully added bid for pet ${pet} for owner ${owner} and care taker ${care_taker} \
                from ${start_date} to ${end_date}`,
    });
  } catch (error) {
    console.error("Error adding bid", error);

    res.status(404).json({ message: "Error adding bid", error });
  }
});

router.post("/review", async (req, res) => {
  try {
    const {
      pet,
      care_taker,
      start_date,
      end_date,
      rating,
      review_text,
    } = req.body;
    const result = await Bids.addReview(
      pet,
      care_taker,
      new Date(start_date),
      new Date(end_date),
      rating,
      review_text
    );

    if (result.rowCount === 0) {
      return res.status(404).send({
        message: `Error adding review for pet ${pet} and care taker ${care_taker} from ${start_date} to ${end_date} \
                  with rating ${rating} and review text ${review_text}`,
      });
    }

    res.status(201).send({
      message: `Successfully added review for pet ${pet} and care taker ${care_taker} from ${start_date} to ${end_date} \
                with rating ${rating} and review text ${review_text}`,
    });
  } catch (error) {
    console.error("Error adding review", error);

    res.status(404).json({ message: "Error adding review", error });
  }
});

router.post("/success", async (req, res) => {
  try {
    const {
      pet,
      care_taker,
      start_date,
      end_date,
      payment_type,
      transfer_method,
    } = req.body;
    const result = await Bids.setSuccessfulBid(
      pet,
      care_taker,
      new Date(start_date),
      new Date(end_date),
      payment_type,
      transfer_method
    );

    if (result.rowCount === 0) {
      return res.status(404).send({
        message: `Error setting successful bid for pet ${pet} and care taker ${care_taker} from ${start_date} to ${end_date} \
                  with payment type ${payment_type} and transfer method ${transfer_method}`,
      });
    }

    res.status(200).send({
      message: `Successfully set bid success for pet ${pet} and care taker ${care_taker} from ${start_date} to ${end_date} \
                with payment type ${payment_type} and transfer method ${transfer_method}`,
    });
  } catch (error) {
    console.error("Error setting successful bid", error);

    res.status(404).json({ message: "Error settings successful bid", error });
  }
});

module.exports = router;
