const pool = require("./dbPool");

class PetOwner {
  static obsessed(owner) {
    // Obsessed with a caretaker if there exists a unique
    // caretaker with the highest number of successful bids.
    return pool.query(
      `
        WITH count_owner_care_takers AS (  
          SELECT 'po1' AS owner, c.care_taker AS care_taker, c.orders AS max_bid_count
          FROM (
          ( 
            SELECT b.owner AS owner, b.care_taker AS care_taker, COUNT(b.care_taker) AS orders
              FROM bids b
              GROUP BY (b.owner, b.care_taker)
              HAVING owner = 'po1'
              ORDER BY COUNT(b.care_taker) DESC )
          ) AS c
          WHERE c.orders = (
            SELECT MAX(ct.orders) AS count
              FROM ( 
                SELECT b.owner AS owner, b.care_taker AS care_taker, COUNT(b.care_taker) AS orders
                  FROM bids b
                  GROUP BY (b.owner, b.care_taker)
                  HAVING owner = 'po1'
                  ORDER BY COUNT(b.care_taker) DESC 
              ) AS ct
          )
        )

        SELECT 
          CASE
            WHEN COUNT(c.max_bid_count) = 0 THEN 'no_obsession' 
            WHEN COUNT(c.max_bid_count) > 1  THEN 'no_obsession'
            ELSE MAX(c.care_taker)  
          END AS obsessed_caretaker
          FROM count_owner_care_takers c;
    `,
      [owner]
    );
  }
}

module.exports = PetOwner;
