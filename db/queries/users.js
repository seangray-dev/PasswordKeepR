const db = require("../connection");

const getUsers = () => {
  return db
    .query("SELECT * FROM users;")
    .then((data) => {
      return data.rows;
    });
};

const createUser = (user) => {
  const query = `
    INSERT INTO users (organization_id, email, password, is_admin)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [
    user.organization_id,
    user.email,
    user.password,
    user.is_admin,
  ];
  return db.query(query, values);
};

const getUserByEmail = (email) => {
  const query = `
    SELECT * FROM users
    WHERE email = $1;
  `;
  return db.query(query, [email]);
};

module.exports = { getUsers, createUser, getUserByEmail };
