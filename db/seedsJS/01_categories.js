const generateSql = (encrypt) => `
INSERT INTO categories (name)
VALUES ('Social'),
       ('Work'),
       ('Entertainment');
`;

module.exports = { generateSql };
