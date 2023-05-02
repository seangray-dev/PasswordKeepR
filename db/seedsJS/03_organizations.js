const generateSql = (encrypt) => `
INSERT INTO organizations (name, admin_id)
VALUES ('LightHouse Labs', NULL),
       ('PasswordKeepr', NULL);
`;

module.exports = { generateSql };
