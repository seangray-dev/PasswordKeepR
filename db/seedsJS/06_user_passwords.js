const generateSql = (encrypt) => `
INSERT INTO user_passwords (id, user_id, website_id, username, password)
VALUES (uuid_generate_v4(), (SELECT id FROM users WHERE email = 'user1@example.com'), (SELECT id FROM websites WHERE name = 'Compass'), 'user1_compass', '${encrypt(
  "user1compass"
)}'),
       (uuid_generate_v4(), (SELECT id FROM users WHERE email = 'user1@example.com'), (SELECT id FROM websites WHERE name = 'Facebook'), 'user1_fb', '${encrypt(
         "user1fbpass"
       )}'),
       (uuid_generate_v4(), (SELECT id FROM users WHERE email = 'user1@example.com'), (SELECT id FROM websites WHERE name = 'Slack'), 'user1_slack', '${encrypt(
         "user1slack"
       )}'),
       (uuid_generate_v4(), (SELECT id FROM users WHERE email = 'user1@example.com'), (SELECT id FROM websites WHERE name = 'Netflix'), 'user1_netflix', '${encrypt(
         "user1netflix"
       )}'),
       (uuid_generate_v4(), (SELECT id FROM users WHERE email = 'user2@example.com'), (SELECT id FROM websites WHERE name = 'Compass'), 'user2_compass', '${encrypt(
         "user2compass"
       )}'),
       (uuid_generate_v4(), (SELECT id FROM users WHERE email = 'user2@example.com'), (SELECT id FROM websites WHERE name = 'Facebook'), 'user2_fb', '${encrypt(
         "user2fbpass"
       )}'),
       (uuid_generate_v4(), (SELECT id FROM users WHERE email = 'user2@example.com'), (SELECT id FROM websites WHERE name = 'Slack'), 'user2_slack', '${encrypt(
         "user2slack"
       )}'),
       (uuid_generate_v4(), (SELECT id FROM users WHERE email = 'user2@example.com'), (SELECT id FROM websites WHERE name = 'Netflix'), 'user2_netflix', '${encrypt(
         "user2netflix"
       )}'),
       (uuid_generate_v4(), (SELECT id FROM users WHERE email = 'user3@example.com'), (SELECT id FROM websites WHERE name = 'Compass'), 'user3_compass', '${encrypt(
         "user3compass"
       )}'),
       (uuid_generate_v4(), (SELECT id FROM users WHERE email = 'user3@example.com'), (SELECT id FROM websites WHERE name = 'Facebook'), 'user3_fb', '${encrypt(
         "user3fbpass"
       )}'),
       (uuid_generate_v4(), (SELECT id FROM users WHERE email = 'user3@example.com'), (SELECT id FROM websites WHERE name = 'Slack'), 'user3_slack', '${encrypt(
         "user3slack"
       )}'),
       (uuid_generate_v4(), (SELECT id FROM users WHERE email = 'user3@example.com'), (SELECT id FROM websites WHERE name = 'Netflix'), 'user3_netflix', '${encrypt(
         "user3netflix"
       )}');
`;

module.exports = { generateSql };
