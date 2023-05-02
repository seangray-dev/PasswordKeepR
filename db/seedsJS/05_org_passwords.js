const generateSql = (encrypt) => {
  return `
INSERT INTO org_passwords (organization_id, website_id, username, password)
VALUES (1, 1, 'compass', '${encrypt("org1compasspass")}'),
       (1, 2, 'facebook','${encrypt("org1fbpass")}'),
       (1, 3, 'slack', '${encrypt("org1slackpass")}'),
       (1, 4, 'netflix', '${encrypt("org1netflixpass")}');
`;
};

module.exports = { generateSql };
