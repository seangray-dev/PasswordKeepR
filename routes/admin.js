const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const {
  getOrganizationPasswordsById,
  getOrganizationNameById,
} = require("../db/queries/dashboard");
const { getUsersByOrganizationId } = require("../db/queries/organizations");

router.get("/", async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
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
      const organizationUsers = await getUsersByOrganizationId(userId);
      const data = {
        organizationPasswords,
        organizationName,
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

module.exports = router;
