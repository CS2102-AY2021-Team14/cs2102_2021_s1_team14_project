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

  static removeLeave(user_name, leave_date) {
    return pool.query("DELETE FROM care_taker_leaves WHERE care_taker = $1 AND leave_date = $2;", [
      user_name,
      leave_date
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

  static getPetTypes(user_name) {
    return pool.query(
      "SELECT * FROM care_takers_pet_preferences WHERE care_taker = $1;",
      [user_name]
    )
  }

  static editPetType(user_name, pet_type, price) {
    return pool.query(
      `
      UPDATE care_takers_pet_preferences
        SET price = $3
        WHERE care_taker = $1 AND pet_type = $2
      `, [user_name, pet_type, price]
    )
  }

  // Add a pet type caretaker can take care of
  static addPetType(user_name, pet_type, is_part_time) {
    if (is_part_time) {
      return pool.query(
        "INSERT INTO care_takers_pet_preferences VALUES($1, $2, $3);",
        [user_name, pet_type, 1.0]
      );
    } else {
      return pool.query(
        "INSERT INTO care_takers_pet_preferences VALUES($1, $2);",
        [user_name, pet_type]
      );
    }
  }

  // Remove a pet type caretaker can take care of
  static removePetType(user_name, pet_type) {
    return pool.query(
      "DELETE FROM care_takers_pet_preferences WHERE care_taker = $1 AND pet_type = $2;",
      [user_name, pet_type]
    );
  }

  static getAll() {
    return pool.query(`
      SELECT care_takers.*, users.name, users.user_email, users.user_country, users.user_address,
        JSON_AGG(daily_price) AS pet_prices, care_takers_rating.avg_rating
      FROM ((care_takers NATURAL JOIN users) 
        INNER JOIN daily_price 
        ON care_takers.user_name = daily_price.care_taker)
        LEFT JOIN care_takers_rating
        ON care_takers.user_name = care_takers_rating.care_taker
      GROUP BY (care_takers.user_name, users.name, users.user_email, users.user_country, users.user_address, care_takers_rating.avg_rating);
    `);
  }
}

module.exports = Caretaker;
