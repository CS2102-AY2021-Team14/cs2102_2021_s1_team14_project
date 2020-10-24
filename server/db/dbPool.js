const { Pool } = require("pg");

// // Production
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.DB_USESSL === "true"
      ? {
          rejectUnauthorized: false,
        }
      : null,
});

// DEV ENV (Clarence)
// const pool = new Pool({
//   user: "postgres",
//   password: "postgres",
//   host: "localhost",
//   port: 8080,
//   database: "yogapets"
// });

module.exports = pool;
