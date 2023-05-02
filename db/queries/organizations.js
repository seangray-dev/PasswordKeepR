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
const getUsersByOrganizationId = async (userId) => {
  const query = {
    text: `
      SELECT u.id, u.email, u.password, u.is_admin
      FROM users u
      INNER JOIN organizations o ON u.organization_id = o.id
      WHERE o.id = (
        SELECT organization_id
        FROM users
        WHERE id = $1
      );
    `,
    values: [userId],
  };

  const result = await db.query(query);
  return result.rows;
};

module.exports = {
  getOrganizationByName,
  createOrganization,
  getUsersByOrganizationId,
};
