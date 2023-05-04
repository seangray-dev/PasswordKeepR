const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const {
  getUserById,
  getOrganizationPasswordsById,
  getOrganizationNameById,
} = require("../db/queries/dashboard");
const {
  getUsersByOrganizationId,
  getOrganizationIdByUserId,
  editOrganizationPassword,
  editOrganizationPasswordAndUser,
  editOrganizationPasswordUser,
  deleteOrganizationPasswordAndWebsite,
  createNewOrganizationPassword,
  deleteUserById,
} = require("../db/queries/organizations");

router.get("/", async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const userId = req.session.userId;
  const isAdminQuery = `SELECT is_admin FROM users WHERE id = $1`;
  db.query(isAdminQuery, [userId], async (err, result) => {
    if (err) {
      console.log(err);
      return res.render("error", { message: "An error occurred" });
    }

    const isAdmin = result.rows[0].is_admin;

    if (isAdmin) {
      const organizationPasswords = await getOrganizationPasswordsById(userId);
      const organizationName = await getOrganizationNameById(userId);
      const capitalizedOrganizationName = capitalizeFirstLetter(
        organizationName.name
      );
      const allOrganizationUsers = await getUsersByOrganizationId(userId);
      const organizationUsers = allOrganizationUsers.filter(
        (user) => !user.is_admin
      );
      const data = {
        organizationPasswords,
        organizationName: {
          ...organizationName,
          name: capitalizedOrganizationName,
        },
        organizationUsers,
        isAdmin,
      };
      return res.render("admin", data);
    } else {
      const organizationPasswords = await getOrganizationPasswordsById(userId);
      const organizationName = await getOrganizationNameById(userId);
      const data = {
        organizationPasswords,
        organizationName,
      };
      return res.render("dashboard", data);
    }
  });
});

router.post("/", async (req, res) => {
  //Add new organization password to DB
  const organizationId = await getOrganizationIdByUserId(req.session.userId);
  if (!organizationId) {
    throw new Error("Organization id not found!");
  }

  const userName = req.body.username;
  const website = req.body.website;
  const password = req.body.password;
  await createNewOrganizationPassword(
    organizationId,
    userName,
    website,
    password
  );

  res.redirect("/admin");
});

router.put("/", async (req, res) => {
  if (!(await getUserById(req.session.userId))) {
    return res.send("Please login to edit password!");
  }
  const newUsername = req.body.newUsername;
  const newPassword = req.body.newPassword;
  const organizationPasswordId = req.body.organizationPasswordId;

  // if new username is empty
  if (!newUsername && newPassword && organizationPasswordId) {
    await editOrganizationPassword(newPassword, organizationPasswordId);
  }

  // if password fields are empty
  if (!newPassword) {
    await editOrganizationPasswordUser(newUsername, organizationPasswordId);
  }

  // if all fields are present
  if (newUsername && newPassword) {
    await editOrganizationPasswordAndUser(
      newUsername,
      newPassword,
      organizationPasswordId
    );
  }

  return res.sendStatus(200);
});

router.delete("/", async (req, res) => {
  if (!(await getUserById(req.session.userId))) {
    return res.send("Please login to delete password!");
  }

  // Delete organization password and website from DB
  const organizationPasswordId = req.body.organizationPasswordId;
  const websiteId = req.body.websiteId;

  if (websiteId && organizationPasswordId) {
    await deleteOrganizationPasswordAndWebsite(
      organizationPasswordId,
      websiteId
    );

    return res.sendStatus(200);
  } else {
    console.log(
      "Failed to delete password for:",
      websiteId,
      organizationPasswordId
    );
  }

  // Delete user from the database
  if (req.body.userId) {
    const userIdToDelete = req.body.userId;
    await deleteUserById(userIdToDelete);
    return res.sendStatus(200);
  } else {
    return res.status(400).send("Invalid request data");
  }
});

module.exports = router;
