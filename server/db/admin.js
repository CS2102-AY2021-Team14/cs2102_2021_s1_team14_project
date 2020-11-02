const pool = require("./dbPool");

class Admin {
  static getUnderperforming() {
    // Low average rating (< 3 stars) OR
    // AVERAGE < 60 pet-day per month OR
    // This month (< 2 stars)
    return pool.query(`
      SELECT care_taker
        FROM care_takers_rating 
        WHERE avg_rating < 3
      UNION
      SELECT care_taker
        FROM bids 
        GROUP BY care_taker
        HAVING SUM(date(end_date) - date(start_date) + 1) < 60
      UNION 
      SELECT care_taker
        FROM bids 
        GROUP BY care_taker, date_part('month', end_date)
        HAVING AVG(rating) < 2;
    `);
  }

  static getEmployeeOfMonth() {
    // Most pet days worked in the month
    // Highest rating in the month only
    return pool.query(`
      SELECT care_taker
        FROM bids
        GROUP BY care_taker, date_part('month', end_date)
        HAVING date_part('month', end_date) = date_part('month', now())
        ORDER BY SUM(date(end_date) - date(start_date) + 1) DESC, AVG(rating) DESC, COUNT(owner) DESC
        LIMIT 1; 
    `);
  }

  // static getTotalNumberOfPetsTakenCare(month) {
  //   return pool.query("SELECT 1");
  // }

  // static getTotalSalaryToBePaid(month) {
  //   return pool.query("SELECT 1");
  // }

  // static getMonthWithHighestNumberOfJobs() {
  //   return pool.query("SELECT 1");
  // }

  // static setBaseDailyPrice() {
  //   return pool.query("SELECT 1");
  // }
}

module.exports = Admin;
