require("dotenv").config({ path: __dirname + "/.env" });
require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlware/requireAuth");

mongoose.set("strictQuery", false);

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ekuiraq.mongodb.net/?retryWrites=true&w=majority`
);

mongoose.connection.on("connected", () => {
  console.log("Connected to the mongoose server");
});
mongoose.connection.on("error", (err) => {
  console.error("Something went wrong", err);
});

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email is ${req.user.email}`);
});

app.listen("3000", () => {
  console.log("Listening on Port 3000");
});
