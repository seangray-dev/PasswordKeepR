const express = require("express");
const router = express.Router();
const db = require("../db/connection");

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
      return res.status(403).render("error", {
        message: "Access denied. You do not have admin privileges.",
      });
    }

    // Render admin page
    res.render("admin");
  });
});

module.exports = router;
