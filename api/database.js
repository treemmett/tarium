const pgp = require('pg-promise');

const config = {
  host: 'localhost',
  port: 5432,
  database: 'tarium',
  user: 'postgres',
  password: 'password'
}
const database = pgp(config);

module.exports = database;
