const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const {
  createUser,
  getUserByEmail,
  updateAdmin,
} = require("../db/queries/users");
const {
  getOrganizationByName,
  createOrganization,
} = require("../db/queries/organizations");

// Render the register page
router.get("/", (req, res) => {
  res.render("register");
});

// User registration
router.post("/", async (req, res) => {
  try {
    const { email, password, password_confirm, organization } = req.body;

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).send("User with this email already exists.");
    }

    let org_id = null;
    let is_admin = false;

    // Handle organization logic
    if (organization) {
      const existingOrg = await getOrganizationByName(organization);
      if (existingOrg) {
        org_id = existingOrg.id;
      } else {
        const newOrg = await createOrganization(organization);
        org_id = newOrg.id;
        is_admin = true;
      }
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = {
      organization_id: org_id,
      email,
      password: hashedPassword,
      is_admin: is_admin,
    };
    const createdUser = await createUser(newUser);

    // Update the organization's admin if true
    if (is_admin) {
      await updateAdmin(createdUser.id, org_id);
    }

    // Redirect to the login page
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred during registration.");
  }
});

module.exports = router;
