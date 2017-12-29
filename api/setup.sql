DROP DATABASE IF EXISTS tarium;
CREATE DATABASE tarium;

\c tarium;

CREATE TABLE inventory (
  id SERIAL PRIMARY KEY,
  asset VARCHAR,
  model VARCHAR,
  serial VARCHAR,
  os VARCHAR,
  status VARCHAR,
  location VARCHAR
);

CREATE TABLE assignments (
  id SERIAL PRIMARY KEY,
  asset VARCHAR,
  assignee VARCHAR,
  date_assigned INT,
  date_returned INT,
  expected_return INT
);
