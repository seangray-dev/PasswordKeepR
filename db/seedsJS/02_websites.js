const generateSql = (encrypt) => `
INSERT INTO websites (id, name, category_id)
VALUES (uuid_generate_v4(), 'Compass', (SELECT id FROM categories WHERE name = 'Work')),
       (uuid_generate_v4(), 'Facebook', (SELECT id FROM categories WHERE name = 'Social')),
       (uuid_generate_v4(), 'Slack', (SELECT id FROM categories WHERE name = 'Work')),
       (uuid_generate_v4(), 'Netflix', (SELECT id FROM categories WHERE name = 'Entertainment'));
`;

module.exports = { generateSql };
