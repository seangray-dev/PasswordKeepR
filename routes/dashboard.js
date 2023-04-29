const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
// Data for coding purpose, will be replaced with database query!
const userPasswords = [
  {website: 'https://www.facebook.com/', username: 'username01', password: 'password01', category: 'Social'},
  {website: 'https://github.com', username: 'username02', password: 'password02', category: 'Work'},
  {website: 'https://ca.linkedin.com/', username: 'username03', password: 'password03', category: 'Work'},
  {website: 'https://www.netflix.com/ca/', username: 'username04', password: 'password04', category: 'Entertainment'},
  {website: 'https://www.instagram.com/', username: 'username05', password: 'password05', category: 'Social'}
];
const organizationPasswords = [
  {website: 'https://github.com', username: 'username06', password: 'password06'},
  {website: 'https://www.staples.ca/', username: 'username07', password: 'password07'},
  {website: 'https://www.amazon.ca/', username: 'username08', password: 'password08'},
];
const organizationName = {name: 'Lighthouse Labs'};

// Group user passwords by category for rendering
let groupedUserPasswords = [];
for (let userPassword of userPasswords) {
  let group = groupedUserPasswords.find(each => each.category === userPassword.category);
  if (group) {
    group.passwords.push(userPassword);
  } else {
      groupedUserPasswords.push({category: userPassword.category, passwords: [userPassword]});
    }
  };

const passwordData = {groupedUserPasswords: groupedUserPasswords, organizationPasswords: organizationPasswords, organizationName: organizationName}
res.render("dashboard", passwordData);
});

module.exports = router;
