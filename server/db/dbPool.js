const { Pool } = require("pg");

// // Production
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: process.env.DB_USESSL
//     ? {
//         rejectUnauthorized: false,
//       }
//     : null,
// });

// DEV ENV (Clarence)
const pool = new Pool({
  user: "postgres",
  password: "zxcv",
  host: "localhost",
  port: 5432,
  database: "yogapets"
});

module.exports = pool;
