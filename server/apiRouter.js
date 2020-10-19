const express = require("express");
const petsRouter = require("./routes/pets");
const jwtAuthRouter = require("./routes/jwtAuth");

const apiRouter = express.Router();

// Add new routes here
apiRouter.use("/pets", petsRouter);
// apiRouter.use("/auth", jwtAuthRouter);
// eg:
// appRouter.use("/bids", bidsRouter);

module.exports = apiRouter;
