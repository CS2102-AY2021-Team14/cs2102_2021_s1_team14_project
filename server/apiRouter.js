const express = require("express");
const petsRouter = require("./routes/pets");
const jwtAuthRouter = require("./routes/jwtAuth");
const dashboardRouter = require("./routes/dashboard");

const apiRouter = express.Router();

// Add new routes here

// Pet Routes
apiRouter.use("/pets", petsRouter);

// Register and Login Routes
apiRouter.use("/auth", jwtAuthRouter);

// Dashboard Routes - Routes to the various dashboards
apiRouter.use("/dashboard", dashboardRouter);

// eg:
// appRouter.use("/bids", bidsRouter);

module.exports = apiRouter;
