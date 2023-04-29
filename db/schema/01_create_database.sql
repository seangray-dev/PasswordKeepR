CREATE DATABASE passwordkeepr;

\c passwordkeepr;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  organization_id INTEGER,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE organizations (
  id SERIAL PRIMARY KEY,
  admin_id INTEGER REFERENCES users(id),
  name VARCHAR(255) NOT NULL
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE websites (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category_id INTEGER REFERENCES categories(id)
);

CREATE TABLE user_passwords (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  website_id INTEGER REFERENCES websites(id),
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE org_passwords (
  id SERIAL PRIMARY KEY,
  organization_id INTEGER REFERENCES organizations(id),
  website_id INTEGER REFERENCES websites(id),
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
