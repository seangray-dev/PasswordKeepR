const generateSql = (encrypt) => `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO organizations (id, name, admin_id)
VALUES (uuid_generate_v4(), 'LightHouse Labs', NULL),
       (uuid_generate_v4(), 'PasswordKeepr', NULL);
`;

module.exports = { generateSql };
