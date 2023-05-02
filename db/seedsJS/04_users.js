const generateSql = (encrypt) => `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO users (id, email, password, is_admin, organization_id)
VALUES (uuid_generate_v4(), 'admin@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', TRUE, (SELECT id FROM organizations WHERE name = 'LightHouse Labs')),
       (uuid_generate_v4(), 'user1@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', FALSE, (SELECT id FROM organizations WHERE name = 'LightHouse Labs')),
       (uuid_generate_v4(), 'user2@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', FALSE, (SELECT id FROM organizations WHERE name = 'LightHouse Labs')),
       (uuid_generate_v4(), 'user3@example.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', FALSE, (SELECT id FROM organizations WHERE name = 'PasswordKeepr'));
`;

module.exports = { generateSql };
