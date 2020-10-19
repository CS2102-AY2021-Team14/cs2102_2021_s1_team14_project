const pool = require("./dbPool");

class Pets {
  static getAll() {
    // TODO proper SQL query
    // return pool.query("SELECT * FROM pets;");

    return pool.query("SELECT 1;");
  }

  static get(id) {
    // TODO proper SQL query (not using id)
    // return pool.query("SELECT * FROM pets WHERE id = $1;", [id]);

    return pool.query("SELECT 1;");
  }

  static add({ name, ownerId /** , and other attributes TODO */ }) {
    // TODO proper SQL query
    // return pool.query("INSERT INTO pets(name, ..., ... VALUES ($1, $2, $3);", [name, ownerId, blabla]) ;

    return pool.query("SELECT 1;");
  }
}

module.exports = Pets;
