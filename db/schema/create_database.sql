CREATE DATABASE passwordkeepr;

\c passwordkeepr;

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE organizations (
  id SERIAL PRIMARY KEY,
  admin_id INTEGER REFERENCES users(id),
  name VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  organization_id INTEGER REFERENCES organizations(id),
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE websites (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category_id INTEGER REFERENCES categories(id)
);

CREATE TABLE user_passwords (
  id SERIAL PRIMARY KEY,
  website_id INTEGER REFERENCES websites(id),
  organization_id INTEGER REFERENCES organizations(id),
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE org_passwords (
  id SERIAL PRIMARY KEY,
  website_id INTEGER REFERENCES websites(id),
  organization_id INTEGER REFERENCES organizations(id),
  passwords VARCHAR(255) NOT NULL
);
