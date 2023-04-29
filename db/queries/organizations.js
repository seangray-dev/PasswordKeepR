const db = require("../connection");

// Retrieve an organization by name
const getOrganizationByName = async (name) => {
  const query = {
    text: "SELECT * FROM organizations WHERE name = $1;",
    values: [name],
  };

  const result = await db.query(query);
  return result.rows[0];
};

// Create a new organization
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
