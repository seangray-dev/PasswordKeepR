const express = require("express");
const router = express.Router();
const cookieSession = require("cookie-session");
const {
  getUserById,
  getUserPasswordsById,
  getOrganizationPasswordsById,
  getOrganizationNameById,
  editUserPassword,
  editUserPasswordAndUser,
  editUserPasswordUser,
  deleteUserPasswordAndWebsite,
  createNewPassword,
} = require("../db/queries/dashboard");

router.use(
  cookieSession({
    name: "session",
    keys: ["some-long-secret-key1", "some-long-secret-key2"],
  })
);

router.get("/", async (req, res) => {
  if (!(await getUserById(req.session.userId))) {
    return res.render("error", { message: "Please login to view your Dashboard!" });
  }

  // Retrieve user passwords and organization passwords/name from DB
  const userPasswords = await getUserPasswordsById(req.session.userId);
  const organizationPasswords = await getOrganizationPasswordsById(
    req.session.userId
  );
  const organizationName = await getOrganizationNameById(req.session.userId);

  // Group user passwords by category for rendering
  let groupedUserPasswords = [];
  for (let userPassword of userPasswords) {
    let group = groupedUserPasswords.find(
      (each) => each.category === userPassword.category
    );
    if (group) {
      group.passwords.push(userPassword);
    } else {
      groupedUserPasswords.push({
        category: userPassword.category,
        passwords: [userPassword],
      });
    }
  }

  const user = await getUserById(req.session.userId);
  const isAdmin = user.is_admin;

  const passwordData = {
    groupedUserPasswords: groupedUserPasswords,
    organizationPasswords: organizationPasswords,
    organizationName: organizationName,
    isAdmin: isAdmin,
  };
  res.render("dashboard", passwordData);
});

router.post("/", async (req, res) => {
  if (!(await getUserById(req.session.userId))) {
    return res.render("error", { message: "Please login to add a new password!" });
  }

  //Add new password to DB
  const userId = req.session.userId;
  const userName = req.body.username;
  const website = req.body.website;
  const password = req.body.password;
  const category = req.body.category;
  await createNewPassword(userId, userName, website, password, category);

  res.redirect("/dashboard");
});

router.put("/", async (req, res) => {
  if (!(await getUserById(req.session.userId))) {
    return res.render("error", { message: "Please login to edit a password!" });
  }

  // Update user password in DB
  const newUsername = req.body.newUsername;
  const newPassword = req.body.newPassword;
  const userPasswordId = req.body.userPasswordId;

  // if new username is empty
  if (!newUsername && newPassword && userPasswordId) {
    await editUserPassword(newPassword, userPasswordId);
  }

  // if password fields are empty
  if (!newPassword) {
    await editUserPasswordUser(newUsername, userPasswordId);
  }

  // if all fields are present
  if (newUsername && newPassword) {
    await editUserPasswordAndUser(
      newUsername,
      newPassword,
      userPasswordId
    );
  }

  return res.sendStatus(200);
});

router.delete("/", async (req, res) => {
  if (!(await getUserById(req.session.userId))) {
    return res.render("error", { message: "Please login to delete a password!" });
  }

  // Delete password and website from DB
  const userPasswordId = req.body.userPasswordId;
  const websiteId = req.body.websiteId;
  await deleteUserPasswordAndWebsite(userPasswordId, websiteId);

  return res.sendStatus(200);
});

module.exports = router;
