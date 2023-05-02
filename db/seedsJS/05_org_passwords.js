const generateSql = (encrypt) => {
  return `
INSERT INTO org_passwords (organization_id, website_id, username, password)
VALUES (1, 1, 'LHL-admin', '${encrypt("org1compasspass")}'),
       (1, 2, 'LHL-admin','${encrypt("org1fbpass")}'),
       (1, 3, 'LHL-admin', '${encrypt("org1slackpass")}'),
       (1, 4, 'LHL-admin', '${encrypt("org1netflixpass")}');
`;
};

module.exports = { generateSql };
