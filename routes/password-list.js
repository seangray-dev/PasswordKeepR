/*
 * All routes for password list are defined here
 * Since this file is loaded in server.js into /passwords,
 *   these routes are mounted onto /passwords
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  // Data for coding purpose, will be replaced with database query!
const storedPasswords = [
  {id: 01, website: 'website01', username: 'username01', password: 'password01'},
  {id: 02, website: 'website02', username: 'username02', password: 'password02'},
  {id: 03, website: 'website03', username: 'username03', password: 'password03'},
  {id: 04, website: 'website04', username: 'username04', password: 'password04'},
  {id: 05, website: 'website05', username: 'username05', password: 'password05'}
];

  res.render('password-list', {data: storedPasswords});
});

module.exports = router;
