const generateSql = (encrypt) => `
INSERT INTO org_passwords (id, organization_id, website_id, username, password)
VALUES
  (uuid_generate_v4(), (SELECT id FROM organizations WHERE name = 'LightHouse Labs'), (SELECT id FROM websites WHERE name = 'Compass'), 'LHL-admin', '${encrypt(
    "org1compasspass"
  )}'),
  (uuid_generate_v4(), (SELECT id FROM organizations WHERE name = 'LightHouse Labs'), (SELECT id FROM websites WHERE name = 'Facebook'), 'LHL-admin', '${encrypt(
    "org1fbpass"
  )}'),
  (uuid_generate_v4(), (SELECT id FROM organizations WHERE name = 'LightHouse Labs'), (SELECT id FROM websites WHERE name = 'Slack'), 'LHL-admin', '${encrypt(
    "org1slackpass"
  )}'),
  (uuid_generate_v4(), (SELECT id FROM organizations WHERE name = 'LightHouse Labs'), (SELECT id FROM websites WHERE name = 'Netflix'), 'LHL-admin', '${encrypt(
    "org1netflixpass"
  )}')
`;

module.exports = { generateSql };
