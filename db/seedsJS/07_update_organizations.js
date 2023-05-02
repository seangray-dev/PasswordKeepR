const generateSql = (encrypt) => {
  return `UPDATE organizations
SET admin_id = (
  SELECT id FROM users WHERE email = 'admin@example.com'
)
WHERE name = 'LightHouse Labs';

UPDATE organizations
SET admin_id = (
  SELECT id FROM users WHERE email = 'user3@example.com'
)
WHERE name = 'PasswordKeepr';
`;
};

module.exports = { generateSql };
