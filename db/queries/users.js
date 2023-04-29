const db = require("../connection");

// Retrieve users
const getUsers = () => {
  return db.query("SELECT * FROM users;").then((data) => {
    return data.rows;
  });
};

// Create a new user
const createUser = (user) => {
  const { organization_id, email, password, is_admin } = user;
  const query = `
    INSERT INTO users (organization_id, email, password, is_admin)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  return db.query(query, [organization_id, email, password, is_admin]).then((res) => res.rows[0]);
};

// Retrieve a user by email
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

// Update the admin of an organization
const updateAdmin = async (user_id, organization_id) => {
  try {
    const result = await db.query(
      "UPDATE organizations SET admin_id = $1 WHERE id = $2",
      [user_id, organization_id]
    );
    return result.rowCount === 1;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { getUsers, createUser, getUserByEmail, updateAdmin};
