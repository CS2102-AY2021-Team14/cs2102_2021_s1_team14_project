const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DB_USESSL
    ? {
        rejectUnauthorized: false,
      }
    : null,
});

module.exports = pool;
