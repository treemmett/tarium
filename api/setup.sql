DROP DATABASE IF EXISTS tarium;
CREATE DATABASE tarium;

\c tarium;

CREATE TABLE inventory (
  id SERIAL PRIMARY KEY,
  asset INT,
  model VARCHAR,
  serial VARCHAR,
  os VARCHAR,
  status VARCHAR,
  location VARCHAR
);
