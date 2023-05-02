const generateSql = (encrypt) => {
  return `
INSERT INTO user_passwords (user_id, website_id, username, password)
VALUES (2, 2, 'user1_compass', '${encrypt("user1compass")}'),
       (2, 1, 'user1_fb', '${encrypt("user1fbpass")}'),
       (2, 2, 'user1_slack', '${encrypt("user1slack")}'),
       (2, 4, 'user1_netflix', '${encrypt("user1netflix")}');
`;
};

module.exports = { generateSql };
