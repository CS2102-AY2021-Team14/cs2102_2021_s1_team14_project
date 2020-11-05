const pool = require("./dbPool");

class Pets {
  static getAll() {
    return pool.query("SELECT * FROM pets_full_information;");
  }

  static getAllPetTypes() {
    return pool.query("SELECT unnest(enum_range(NULL::pet_type))::text;");
  }

  static getPetsOfOwner(owner) {
    return pool.query("SELECT * FROM pets_full_information WHERE pet_owner = $1;", [owner]);
  }

  static get(name, owner) {
    return pool.query("SELECT * FROM pets WHERE name = $1 AND owner = $2;", [
      name,
      owner,
    ]);
  }

  static add(name, owner, type) {
    return pool.query("INSERT INTO pets VALUES ($1, $2, $3);", [
      name,
      owner,
      type,
    ]);
  }

  static put(name, owner, newName, newType) {
    return pool.query(
      "UPDATE pets SET name = $1, type = $2 WHERE name = $3 AND owner = $4;",
      [newName, newType, name, owner]
    );
  }

  static delete(name, owner) {
    return pool.query("DELETE FROM pets WHERE name = $1 AND owner = $2;", [
      name,
      owner,
    ]);
  }

  static addSpecialRequirement(name, owner, requirement, description) {
    return pool.query(
      "INSERT INTO pet_special_requirements VALUES ($1, $2, $3, $4);",
      [name, owner, requirement, description]
    );
  }

  static deleteSpecialRequirement(name, owner, requirement) {
    return pool.query(
      "DELETE FROM pet_special_requirements WHERE name = $1 AND owner = $2 AND requirement = $3;",
      [name, owner, requirement]
    );
  }

  static addPetCategory(name, owner, category) {
    return pool.query("INSERT INTO pet_category VALUES ($1, $2, $3);", [
      name,
      owner,
      category,
    ]);
  }

  static deletePetCategory(name, owner, category) {
    return pool.query("DELETE FROM pet_category VALUES name = $1 AND owner = $2 AND category = $3;", [
      name,
      owner,
      category,
    ]);
  }
}

module.exports = Pets;
