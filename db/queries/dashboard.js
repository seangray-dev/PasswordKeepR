const db = require("../connection");

const getUserById = (id) => {
  return db.query("SELECT * FROM users WHERE id = $1;", [id]).then((result) => {
    if (result.rows.length === 0) {
      return null;
    } else {
      return result.rows[0];
    }
  });
};

const getUserPasswordsById = (id) => {
  return db
    .query(
      `
    SELECT user_passwords.id AS user_password_id, user_passwords.username, user_passwords.password, websites.name AS website, websites.id AS website_id, categories.name AS category
    FROM user_passwords
    JOIN users ON users.id = user_passwords.user_id
    JOIN websites ON websites.id = user_passwords.website_id
    JOIN categories ON categories.id = websites.category_id
    WHERE users.id = $1
    `,
      [id]
    )
    .then((result) => result.rows);
};

const getOrganizationPasswordsById = (id) => {
  return db
    .query(
      `
    SELECT org_passwords.username, org_passwords.password, websites.name AS website
    FROM org_passwords
    JOIN organizations ON organizations.id = org_passwords.organization_id
    JOIN users ON users.organization_id = organizations.id
    JOIN websites ON websites.id = org_passwords.website_id
    WHERE users.id = $1
    `,
      [id]
    )
    .then((result) => result.rows);
};

const getOrganizationNameById = (id) => {
  return db
    .query(
      `
    SELECT name
    FROM organizations
    JOIN users ON organizations.id = organization_id
    WHERE users.id = $1
    `,
      [id]
    )
    .then((result) => result.rows[0]);
};

const deleteUserPasswordAndWebsite = async(userPasswordId, websiteId) => {
  // first delete user password from user_passwords table
  await db.query(
    `
    DELETE FROM user_passwords
    WHERE id = $1
    `,
    [userPasswordId]);

  // Then delete website from websites table
  return db.query(
    `
    DELETE FROM websites
    WHERE id = $1
    `,
    [websiteId]
    );
};

const createNewPassword = async (
  userId,
  userName,
  website,
  password,
  category
) => {
  // Check if category exists, if not, create a new one
  let categoryId = await db
    .query(
      `
    SELECT id
    FROM categories
    WHERE name = $1
  `,
      [category]
    )
    .then((result) => (result.rows.length > 0 ? result.rows[0].id : null));

  if (!categoryId) {
    categoryId = await db
      .query(
        `
      INSERT INTO categories (name)
      VALUES ($1)
      RETURNING id;
    `,
        [category]
      )
      .then((result) => result.rows[0].id);
  }

  // Add website, then find website id
  const websiteId = await db
    .query(
      `
    INSERT INTO websites (name, category_id) VALUES ($1, $2)
    RETURNING *;
  `,
      [website, categoryId]
    )
    .then((result) => result.rows[0].id);

  // Add new password
  return db.query(
    `
    INSERT INTO user_passwords (user_id, website_id, username, password)
    VALUES ($1, $2, $3, $4)
    `,
    [userId, websiteId, userName, password]
  );
};

module.exports = {
  getUserById,
  getUserPasswordsById,
  getOrganizationPasswordsById,
  getOrganizationNameById,
  deleteUserPasswordAndWebsite,
  createNewPassword,
};
