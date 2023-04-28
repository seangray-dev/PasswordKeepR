const db = require("../connection");

const getUserPasswordsWithEmail = (email) => {
  return db
    .query(`
    SELECT username, password, websites.name AS website, categories.name AS category
    FROM user_passwords
    JOIN users ON users.id = user_passwords.user_id
    JOIN websites ON websites.id = user_passwords.website_id
    JOIN categories ON categories.id = websites.category_id
    WHERE users.email = $1
    ORDER BY catergories.name
    `, [email])
    .then(result => result.rows);
  };

const getOrganizationPasswordsWithEmail = (email) => {
  return db
    .query(`
    SELECT username, password, websites.name AS website
    FROM org_passwords
    JOIN organizations ON organizations.id = org_passwords.organization_id
    JOIN users ON users.organization_id = organizations.id
    JOIN websites ON websites.id = org_passwords.website_id
    WHERE users.email = $1
    `, [email])
    .then(result => result.rows);
  };

const getOrganizationNameWithEmail = (email) => {
  return db
    .query(`
    SELECT name
    FROM organizations
    JOIN users ON organizations.id = organization_id
    WHERE users.email = $1
    `, [email])
    .then(result => result.rows[0]);
  };


module.exports = { getUserPasswordsWithEmail, getOrganizationPasswordsWithEmail, getOrganizationNameWithEmail };
