// db/queries/organizations.js
const db = require("../connection");

const getOrganizationByName = async (name) => {
  const query = {
    text: "SELECT * FROM organizations WHERE name = $1;",
    values: [name],
  };

  const result = await db.query(query);
  return result.rows[0];
};

const createOrganization = async (name, adminId) => {
  const query = {
    text: "INSERT INTO organizations (name, admin_id) VALUES ($1, $2) RETURNING *;",
    values: [name, adminId],
  };

  const result = await db.query(query);
  return result.rows[0];
};

module.exports = {
  getOrganizationByName,
  createOrganization,
};
