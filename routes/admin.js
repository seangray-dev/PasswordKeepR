const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const {
  getOrganizationPasswordsById,
  getOrganizationNameById,
  getUserById,
} = require("../db/queries/dashboard");
const { getUsersByOrganizationId } = require("../db/queries/organizations");

router.get("/", async (req, res) => {
  if (!(await getUserById(req.session.userId))) {
    return res.send("Please login to view your Dashboard!");
  }

  const organizationPasswords = await getOrganizationPasswordsById(
    req.session.userId
  );

  const organizationName = await getOrganizationNameById(req.session.userId);

  const organizationUsers = await getUsersByOrganizationId(req.session.userId);

  const data = {
    organizationPasswords,
    organizationName,
    organizationUsers,
  };

  res.render("admin", data);
});

router.get("/", (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }

  // Check if logged-in user is an admin
  const userId = req.session.userId;
  const isAdminQuery = `SELECT is_admin FROM users WHERE id = $1`;
  db.query(isAdminQuery, [userId], (err, result) => {
    if (err) {
      console.log(err);
      return res.render("error", { message: "An error occurred" });
    }

    const isAdmin = result.rows[0].is_admin;

    if (!isAdmin) {
      return res.redirect("/dashboard");
    }

    // Render admin page with isAdmin variable
    res.render("admin", { isAdmin });
  });
});

module.exports = router;
