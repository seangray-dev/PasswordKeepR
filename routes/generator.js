const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("generator");
});

module.exports = router;
