const db = require("../connection");
const crypto = require("crypto");

const ENCRYPTION_KEY = process.env.CRYPTO_KEY;
const IV_LENGTH = 16;

const encrypt = (text) => {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

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

// Retrieve organization id by user id
const getOrganizationIdByUserId = (userId) => {
  return db
    .query(
      `
    SELECT organization_id
    FROM users
    WHERE users.id = $1
    `,
      [userId]
    )
    .then((result) => result.rows[0].organization_id);
};

// Delete organization password and website
const deleteOrganizationPasswordAndWebsite = async(organizationPasswordId, websiteId) => {
  // first delete organization password from org_passwords table
  await db.query(
    `
    DELETE FROM org_passwords
    WHERE id = $1
    `,
    [organizationPasswordId]);

  // Then delete website from websites table
  return db.query(
    `
    DELETE FROM websites
    WHERE id = $1
    `,
    [websiteId]
    );
};

// Create new organization password
const createNewOrganizationPassword = async (
  organizationId,
  userName,
  website,
  password,
) => {
  // Get category id for "Work"
  let categoryId = await db
    .query(
      `
    SELECT id
    FROM categories
    WHERE name = $1
  `,
      ["Work"]
    )
    .then((result) => (result.rows.length > 0 ? result.rows[0].id : null));

  if (!categoryId) {
    throw new Error('Can not find category id for "Work"!');
  }

  // Add website, then find website id
  const websiteId = await db
    .query(
      `INSERT INTO websites (name, category_id) VALUES ($1, $2) RETURNING *; `,
      [website, categoryId]
    )
    .then((result) => result.rows[0].id);

  // Add new password
  return db.query(
    `INSERT INTO org_passwords (website_id, organization_id, username, password) VALUES ($1, $2, $3, $4)`,
    [websiteId, organizationId, userName, encrypt(password)]
  );
};

module.exports = {
  getOrganizationByName,
  createOrganization,
  getUsersByOrganizationId,
  getOrganizationIdByUserId,
  deleteOrganizationPasswordAndWebsite,
  createNewOrganizationPassword
};
