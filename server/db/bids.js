const pool = require("./dbPool");

class Bids {
  static addBid(pet, owner, care_taker, pet_type, start_date, end_date) {
    // Trigger here to check bid dates with availability
    pool.query("INSERT INTO bids VALUES ($1, $2, $3, $4, $5, $6);", [
      pet,
      owner,
      care_taker,
      pet_type,
      start_date,
      end_date,
    ]);
  }

  static deleteBid(pet, care_taker, start_date, end_date) {
    // Cannot delete successful bids

    pool.query(
      `
      UPDATE bids 
        SET is_active = false
        WHERE pet = $1 AND care_taker = $2 AND start_date = $3 AND end_date = $4
    `,
      [pet, care_taker, start_date, end_date]
    );
  }

  static addReview(pet, care_taker, start_date, end_date, rating, review_text) {
    // TODO: proper SQL query
    // return pool.query("SELECT avg_rating FROM care_takers_rating care_taker = $1;", [user_name]);
    // return pool.query("SELECT 1");

    pool.query(
      `
      UPDATE bids
        SET rating = $5, review_text = $6
        WHERE pet = $1 AND care_taker = $2 AND start_date = $3 AND end_date = $4
    `,
      [pet, care_taker, start_date, end_date, rating, review_text]
    );
  }

  static setSuccessfulBid(
    pet,
    care_taker,
    start_date,
    end_date,
    payment_type,
    transfer_method
  ) {
    // Trigger to update salary of care_taker

    pool.query(
      `
      UPDATE bids
        SET payment_type = $5, transfer_method = $6
        WHERE pet = $1 AND care_taker = $2 AND start_date = $3 AND end_date = $4
    `,
      [pet, care_taker, start_date, end_date, payment_type, transfer_method]
    );
  }
}

module.exports = Bids;
