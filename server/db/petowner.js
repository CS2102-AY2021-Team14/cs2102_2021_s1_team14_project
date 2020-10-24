const pool = require("./dbPool");

class PetOwner {
  static obsessed(owner) {
    // Occurs when all the pet owner's care taker is this person
    pool.query(
      `
        SELECT 
        CASE
          WHEN num_caretakers = 1 THEN (SELECT care_taker FROM bids GROUP BY owner, care_taker having owner = $1)
          ELSE NULL
        END 
        FROM (
        SELECT COUNT(DISTINCT care_taker) AS num_caretakers
            FROM bids 
            GROUP BY owner
            HAVING owner = $1
        ) AS obsessions;
    `,
      [owner]
    );
  }
}

module.exports = PetOwner;
