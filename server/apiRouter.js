const express = require("express");
const petsRouter = require("./routes/pets");
const jwtAuthRouter = require("./routes/jwtAuth");
const dashboardRouter = require("./routes/dashboard");
const adminRouter = require("./routes/admin");
const caretakerRouter = require("./routes/caretaker");
const bidsRouter = require("./routes/bids");
const petOwnerRouter = require("./routes/petowner");

const apiRouter = express.Router();

// Add new routes here

// Admin Routes
apiRouter.use("/admin", adminRouter);

// Bid Routes
apiRouter.use("/bids", bidsRouter);

// Caretaker Routes
apiRouter.use("/caretaker", caretakerRouter);

// Pet Routes
apiRouter.use("/pets", petsRouter);

// Pet Owner Routes
apiRouter.use("/petowner", petOwnerRouter);

// Register and Login Routes
apiRouter.use("/auth", jwtAuthRouter);

// Dashboard Routes - Routes to the various dashboards
apiRouter.use("/dashboard", dashboardRouter);

// eg:
// appRouter.use("/bids", bidsRouter);

module.exports = apiRouter;
