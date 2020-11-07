const pool = require("./dbPool");

class Admin {
  static getBaseDailyPrices() {
    return pool.query(`SELECT * FROM base_prices;`);
  }

  static insertBaseDailyPrice(pet_type, base_price) {
    return pool.query(
      `
      INSERT INTO base_prices VALUES ($1, $2);
    `,
      [pet_type, base_price]
    );
  }

  static updateBaseDailyPrice(pet_type, base_price) {
    return pool.query(
      `
        UPDATE base_prices SET pet_type = $1, base_price = $2 WHERE pet_type = $1;
    `,
      [pet_type, base_price]
    );
  }

  static deleteBaseDailyPrice(pet_type) {
    return pool.query(
      `
        DELETE FROM base_prices WHERE pet_type = $1;
    `,
      [pet_type]
    );
  }

  ////////// EMPLOYEE DATA /////////////////

  // Fetch all employee's data
  static getEmployees() {
    return pool.query(
      `  SELECT user_roles.user_name, user_address, user_email, is_part_time 
         FROM users 
         JOIN user_roles 
         ON users.user_name = user_roles.user_name 
         WHERE user_roles.role = 'Care Taker'; `
    );
  }

  static getUnderperforming() {
    // Low average rating (< 3 stars) OR
    // AVERAGE < 60 pet-day per month OR
    // This month (< 2 stars)
    return pool.query(`
      SELECT users.user_name, is_part_time, name, ARRAY_AGG(error_type) AS error_types, ARRAY_AGG(error_data) AS error_datas FROM (
        SELECT care_taker, 1 AS error_type, avg_rating AS error_data
          FROM care_takers_rating 
          WHERE avg_rating < 3
        UNION
        SELECT care_taker, 2 AS error_type, (
          SUM(date(end_date) - date(start_date) + 1) / 
          ((date_part('year', MAX(end_date)) - date_part('year', MIN(start_date))) * 12
             + DATE_PART('month', MAX(end_date)) - DATE_PART('month', MIN(start_date)) + 1)
        ) AS error_data
          FROM bids 
          GROUP BY care_taker
          HAVING SUM(date(end_date) - date(start_date) + 1) / 
            ((date_part('year', MAX(end_date)) - date_part('year', MIN(start_date))) * 12
             + DATE_PART('month', MAX(end_date)) - DATE_PART('month', MIN(start_date)) + 1) < 60 
        UNION 
        SELECT care_taker, 3 AS error_type, AVG(rating) AS error_data 
          FROM bids 
          GROUP BY care_taker, date_part('month', end_date)
          HAVING AVG(rating) < 2
      ) AS t INNER JOIN care_takers ON t.care_taker = care_takers.user_name
        INNER JOIN users ON t.care_taker = users.user_name
        GROUP BY (users.user_name, is_part_time, name);
    `);
  }

  static getEmployeeOfMonth() {
    // Most pet days worked in the month
    // Highest rating in the month only
    return pool.query(`
    SELECT employee.care_taker AS care_taker, users.name AS name 
     FROM ( SELECT care_taker
        FROM bids
        GROUP BY care_taker, date_part('month', end_date)
        HAVING date_part('month', end_date) = date_part('month', now())
        ORDER BY SUM(date(end_date) - date(start_date) + 1) DESC, AVG(rating) DESC, COUNT(owner) DESC
        LIMIT 1 ) AS employee 
      INNER JOIN  
      users ON employee.care_taker = users.user_name; 
    `);
  }

  // Output: month_year | type | count
  static getPetTypesByMonth() {
    return pool.query(`
      SELECT to_char(date_trunc('month', start_date), 'Mon-YYYY') AS month_year, 
        pet_type AS type, 
        COUNT(*) as count 
      FROM bids 
      GROUP BY pet_type, date_trunc('month', start_date)
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
