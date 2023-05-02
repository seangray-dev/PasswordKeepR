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
      const capitalizedOrganizationName = capitalizeFirstLetter(organizationName.name);
      const allOrganizationUsers = await getUsersByOrganizationId(userId);
      const organizationUsers = allOrganizationUsers.filter(user => !user.is_admin);
      const data = {
        organizationPasswords,
        organizationName: { ...organizationName, name: capitalizedOrganizationName },
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
