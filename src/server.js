import express from "express";
import route from "./routes.js";
import bodyParser from "body-parser";
import appVersion from "../config/appVersion.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

app.listen(process.env.APP_PORT, "localhost", () => {
  console.log(
    `Server running at http://localhost:${process.env.APP_PORT}/${process.env.APP_VERSION}`
  );
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
    credentials: true,
  })
);

app.use(
  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.contentType("application/json");
    next();
  },
  appVersion,
  bodyParser.json()
);

// production route
app.use(`/${process.env.APP_VERSION}`, route);
