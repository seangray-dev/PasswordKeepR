const express = require("express");
const router = express.Router();

app.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
