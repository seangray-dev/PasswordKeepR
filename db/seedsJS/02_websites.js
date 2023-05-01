const generateSql = (encrypt) => `
INSERT INTO websites (name, category_id)
VALUES ('Compass', 2),
       ('Facebook', 1),
       ('Slack', 2),
       ('Netflix', 3);
`;

module.exports = { generateSql };
