const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

require("dotenv").config({ path: "variables.env" });

const bookController = require("./controllers/bookController");
const chapterController = require("./controllers/chapterController");

const {
  PORT,
  DB_CONNECTION,
  SITE_ROUTE_DEV,
  SITE_ROUTE_PROD,
} = process.env;
const originSites = [SITE_ROUTE_DEV, SITE_ROUTE_PROD];
process.once("SIGUSR2", () =>
  server.close((err) => process.kill(process.pid, "SIGUSR2"))
);

const app = express();

app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: originSites,
    exposedHeaders: [
      "Content-Disposition",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Headers",
    ],
  })
);

app.use(express.static("public"));

app.use("/api/book", bookController);
app.use("/api/chapter", chapterController);

app.all("*", function (error, req, res, next) {
  res.status(404).json({
    message: "Page not found" + error.message,
  });
});

mongoose.connect(
  DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to database")
);

mongoose.connection.on("error", (err) => console.error(`${err}`));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
