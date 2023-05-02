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

// Get all users of an organization
const getUsersByOrganizationId = (organizationId) => {
  return db
    .query(
      `
    SELECT id, email, password, is_admin FROM users WHERE organization_id = $1;
    `,
      [organizationId]
    )
    .then((result) => result.rows);
};

module.exports = {
  getOrganizationByName,
  createOrganization,
  getUsersByOrganizationId,
};
