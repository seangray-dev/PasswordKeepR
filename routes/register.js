// routes/register.js
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { createUser } = require("../db/queries/users");

router.get("/", (req, res) => {
  res.render("register");
});

router.post("/", async (req, res) => {
  try {
    const { email, password, password_confirm, organization } = req.body;
    if (password !== password_confirm) {
      return res.status(400).send("Passwords do not match.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      organization_id: null, // Update this based on your logic for organization_id
      email,
      password: hashedPassword,
      is_admin: false, // Update this based on your logic for is_admin
    };
    await createUser(newUser);
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred during registration.");
  }
});

module.exports = router;
