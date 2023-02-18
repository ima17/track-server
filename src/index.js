require('dotenv').config({path: __dirname + '/.env'})
const express = require("express");
const mongoose = require("mongoose");

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

app.get("/", (req, res) => {
  res.send("Hello there");
});

app.listen("3000", () => {
  console.log("Listening on Port 3000");
});
