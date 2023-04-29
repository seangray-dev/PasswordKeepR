const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { getUserByEmail } = require("../db/queries/users");

// Render the login page
router.get("/", (req, res) => {
  res.render("login");
});

// User login
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Retrieve the user from the database
    const user = await getUserByEmail(email);

    // Check if the user exists and if the password is valid
    if (!user) {
      return res.status(401).json({ message: "Email does not exist" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    res.status(200).json({ message: "Login successful." });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred during login.");
  }
});

module.exports = router;
