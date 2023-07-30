const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'drew214',
  host: 'localhost',
  database: 'likeme',
  port: 5432,
});

module.exports = pool;
