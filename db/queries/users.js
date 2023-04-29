// db/queries/users.js
const db = require("../connection");

const getUsers = () => {
  return db.query("SELECT * FROM users;").then((data) => {
    return data.rows;
  });
};

const createUser = (user) => {
  const { organization_id, email, password, is_admin } = user;
  const query = `
    INSERT INTO users (organization_id, email, password, is_admin)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  return db.query(query, [organization_id, email, password, is_admin]).then((res) => res.rows[0]);
};

const getUserByEmail = (email) => {
  return db.query('SELECT * FROM users WHERE email = $1;', [email])
    .then(data => {
      if (data.rowCount === 0) {
        return null;
      } else {
        return data.rows[0];
      }
    });
};

const getOrganizationByName = (name) => {
  const query = "SELECT * FROM organizations WHERE name = $1;";
  return db.query(query, [name]).then((res) => res.rows[0]);
};

const createOrganization = (name) => {
  const query = "INSERT INTO organizations (name) VALUES ($1) RETURNING *;";
  return db.query(query, [name]).then((res) => res.rows[0]);
};

const updateAdmin = (organization_id, admin_id) => {
  const query = "UPDATE organizations SET admin_id = $1 WHERE id = $2;";
  return db.query(query, [admin_id, organization_id]);
};

module.exports = { getUsers, createUser, getUserByEmail, getOrganizationByName, createOrganization, updateAdmin };
