require("dotenv").config({ path: __dirname + "/.env" });
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: "you must be login" });
  }

  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, process.env.TOKEN_KEY, async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: "you must" });
    }

    const { userID } = payload;

    const user = await User.findById(userID);
    req.user = user;
    next();
  });
};
