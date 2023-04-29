// routes/register.js
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const {
  createUser,
  getOrganizationByName,
  createOrganization,
  getUserByEmail,
  updateAdmin
} = require("../db/queries/users");

router.get("/", (req, res) => {
  res.render("register");
});

router.post("/", async (req, res) => {
  try {
    const { email, password, password_confirm, organization } = req.body;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).send("User with this email already exists.");
    }

    let org_id = null;
    let is_admin = false;

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

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      organization_id: org_id,
      email,
      password: hashedPassword,
      is_admin: is_admin,
    };
    await createUser(newUser);
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred during registration.");
  }
});

module.exports = router;
