const pool = require("./dbPool");

class Caretaker {
  static getLeaves(user_name) {
    return pool.query(
      "SELECT * FROM care_taker_leaves WHERE care_taker = $1;",
      [user_name]
    );
  }

  static addLeave(user_name, leave_date) {
    return pool.query("INSERT INTO care_taker_leaves VALUES ($1, $2);", [
      user_name,
      leave_date,
    ]);
  }

  static getCaretaker(user_name) {
    return pool.query("SELECT * FROM care_takers WHERE user_name = $1;", [
      user_name,
    ]);
  }

  static getSalary(user_name) {
    return pool.query("SELECT * FROM salary WHERE care_taker = $1;", [
      user_name,
    ]);
  }

  static getJobs(user_name) {
    return pool.query(
      "SELECT * FROM bids WHERE care_taker = $1 AND is_successful;",
      [user_name]
    );
  }

  static getRatings(user_name) {
    return pool.query("SELECT * FROM ratings WHERE care_taker = $1;", [
      user_name,
    ]);
  }

  static getAvgRating(user_name) {
    return pool.query(
      "SELECT avg_rating FROM care_takers_rating WHERE care_taker = $1;",
      [user_name]
    );
  }

  // Add a pet type caretaker can take care of
  static addPetType(user_name, pet_type) {
    return pool.query(
      "INSERT INTO care_takers_pet_preferences VALUES($1, $2);",
      [user_name, pet_type]
    );
  }

  // Remove a pet type caretaker can take care of
  static removePetType(user_name, pet_type) {
    return pool.query(
      "DELETE FROM care_takers_pet_preferences WHERE care_taker = $1 AND pet_type = $2;",
      [user_name, pet_type]
    );
  }

  static getAll() {
    return pool.query("SELECT * FROM care_takers;");
  }
}

module.exports = Caretaker;
