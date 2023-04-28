// routes/login.js
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { getUserByEmail } = require("../db/queries/users");

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).send("Invalid email or password.");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).send("Invalid email or password.");
    }
    
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred during login.");
  }
});

module.exports = router;
