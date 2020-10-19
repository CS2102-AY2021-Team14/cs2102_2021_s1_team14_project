const express = require("express");
const petsRouter = require("./routes/pets");
const jwtAuthRouter = require("./routes/jwtAuth");

const apiRouter = express.Router();

// Add new routes here

// Pet Routes
apiRouter.use("/pets", petsRouter);

// Register and Login Routes
apiRouter.use("/auth", jwtAuthRouter);

// eg:
// appRouter.use("/bids", bidsRouter);

module.exports = apiRouter;
