const generateSql = (encrypt) => `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO categories (id, name)
VALUES (uuid_generate_v4(), 'Social'),
       (uuid_generate_v4(), 'Work'),
       (uuid_generate_v4(), 'Entertainment');
`;

module.exports = { generateSql };

