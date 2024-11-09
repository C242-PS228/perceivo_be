require("dotenv").config();
const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Content-Type", "application/json");
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log(
    `Server running on http://${process.env.APP_HOST}:${process.env.APP_PORT}`
  );
});
