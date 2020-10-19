require("dotenv").config();
const express = require("express");
const path = require("path");
const frontendRoutes = require("./src/routes/Routes.js");
const apiRouter = require("./server/apiRouter");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "build")));

// log all requests
app.all("*", (req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Routes
app.get("/ping", (req, res) => {
  return res.send("pong");
});

app.get(Object.values(frontendRoutes), (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(
    `Server started on port: ${port} \nIf you are running this locally, go to http://localhost:${port}`
  );
});
