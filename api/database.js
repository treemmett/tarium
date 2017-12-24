const pgp = require('pg-promise')();

const config = {
  host: '127.0.0.1',
  port: 5432,
  database: 'tarium',
  user: 'postgres',
  password: 'password'
}
const database = pgp(config);

module.exports = database;
