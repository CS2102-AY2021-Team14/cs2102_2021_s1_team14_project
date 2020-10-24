const pool = require("./dbPool");

class Caretaker {
  static getAvailability(user_name) {
    return pool.query(
      "SELECT * FROM care_takers_availability WHERE care_taker = $1;",
      [user_name]
    );
  }

  static addAvailability(user_name, available_date) {
    return pool.query("INSERT INTO care_takers_availability VALUES ($1, $2);", [
      user_name,
      available_date,
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
      "SELECT avg_rating FROM care_takers_rating care_taker = $1;",
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
      "DELETE FROM care_takers_pet_preferences WHERE user_name = $1 AND pet_type = $2;",
      [user_name, pet_type]
    );
  }
}

module.exports = Caretaker;
