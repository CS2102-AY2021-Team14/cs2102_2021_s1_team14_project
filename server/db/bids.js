const pool = require("./dbPool");

class Bids {
  static addBid(pet, owner, care_taker, start_date, end_date) {
      // owner is bidding for care_taker to take care of pet. 

      // Need to check if it's possible, else return error? 
      pool.query("INSERT INTO bids")
  }

  static deleteBid() {
      // Cannot delete successful bids
  }

  static addReview(care_taker, rating, review_text) {
    // TODO: proper SQL query 
    // return pool.query("SELECT avg_rating FROM care_takers_rating care_taker = $1;", [user_name]);

    // return pool.query("SELECT 1");
  }

  static setSuccessfulBid(care_taker, payment_type, transfer_method) {
    // TODO: proper SQL query 
    // return pool.query("SELECT avg_rating FROM care_takers_rating care_taker = $1;", [user_name]);

    // return pool.query("SELECT 1");
  }
}

module.exports = Bids;
