/*
 * All routes for password list are defined here
 * Since this file is loaded in server.js into /passwords,
 *   these routes are mounted onto /passwords
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('password-list');
});

module.exports = router;
