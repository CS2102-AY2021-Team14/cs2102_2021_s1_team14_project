const pool = require("./dbPool");

class Pets {
  static getAll() {
    return pool.query("SELECT * FROM pets;");
  }

  static getPetsOfOwner(owner) {
    return pool.query("SELECT * FROM pets WHERE owner = $1;", [owner]);
  }

  static get(name, owner) {
    return pool.query("SELECT * FROM pets WHERE name = $1 AND owner = $2;", [
      name,
      owner,
    ]);
  }

  static addPetCategory(name, owner, category) {
    return pool.query("INSERT INTO pet_category VALUES ($1, $2, $3);", [
      name,
      owner,
      category,
    ]);
  }

  static add(name, owner, type) {
    return pool.query("INSERT INTO pets VALUES ($1, $2, $3);", [
      name,
      owner,
      type,
    ]);
  }

  static addSpecialRequirement(name, owner, requirement, description) {
    return pool.query(
      "INSERT INTO pet_special_requirements VALUES ($1, $2, $3, %4);",
      [name, owner, requirement, description]
    );
  }
}

module.exports = Pets;
