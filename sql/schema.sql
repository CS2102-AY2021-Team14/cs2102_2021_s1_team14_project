-- Uncomment to recreate your database
-- DROP DATABASE yogapets;
CREATE DATABASE yogapets;

-- changed to separate table as pet owner and care taker may use the same account
-- CREATE TYPE pcs_user_role AS ENUM ('ADMIN', 'CARETAKER', 'OWNER');

CREATE TYPE pet_type AS ENUM ('cat', 'dog', 'bird', 'rabbit', 'rodent', 'fish', 'insect', 'turtle');
-- rodent will include hamster, guinea pig, mouse, rat, gerbil,
-- turtle will include tortoise and terrapin
-- all these 'sub-type' will be category

-- Users
CREATE TABLE IF NOT EXISTS users (
    user_name       VARCHAR(255)    PRIMARY KEY NOT NULL,
    name            VARCHAR(255),
    user_email      VARCHAR(255),
    user_password   VARCHAR(255)    NOT NULL,
    user_country    VARCHAR(30),
    user_address    VARCHAR(255)
);

-- Example invalid insert into user table
-- INSERT INTO users (user_name, user_email, user_password, user_country, user_address, user_role) VALUES ('ching', 'ben@ben.com', 'a', 'si', 'anos', 'BANANA');

-- Example acceptable with bcrypt
-- INSERT INTO users (user_name, user_email, user_password, user_country, user_address, user_role) VALUES ('rob', 'sean@jon.com', 'zy', 'singapore', 'nus', 'OWNER');

CREATE TABLE IF NOT EXISTS pet_owners (
    user_name       VARCHAR(255)    PRIMARY KEY REFERENCES users(user_name)
);

CREATE TABLE IF NOT EXISTS care_takers (
    user_name       VARCHAR(255)    PRIMARY KEY REFERENCES users(user_name),
    is_part_time    BOOLEAN         NOT NULL,
    introduction    VARCHAR
);

CREATE TABLE IF NOT EXISTS pcs_admins (
    user_name       VARCHAR(255)    PRIMARY KEY REFERENCES users(user_name)
);

CREATE VIEW user_roles (user_name, role, is_part_time) AS
    SELECT users.user_name, CASE
            WHEN EXISTS (SELECT user_name FROM pet_owners  WHERE user_name = users.user_name) AND
                 EXISTS (SELECT user_name FROM care_takers WHERE user_name = users.user_name) THEN 'Pet Owner and Care Taker'
            WHEN EXISTS (SELECT user_name FROM pet_owners  WHERE user_name = users.user_name) THEN 'Pet Owner'
            WHEN EXISTS (SELECT user_name FROM care_takers WHERE user_name = users.user_name) THEN 'Care Taker'
            WHEN EXISTS (SELECT user_name FROM pcs_admins  WHERE user_name = users.user_name) THEN 'PCS Admin'
        END AS role,
        is_part_time
    FROM users LEFT JOIN care_takers ON users.user_name = care_takers.user_name;

CREATE TABLE IF NOT EXISTS pets (
    name            VARCHAR(255)    NOT NULL,
    owner           VARCHAR(255)    NOT NULL REFERENCES pet_owners(user_name)     ON DELETE CASCADE,
    type            pet_type        NOT NULL,
    PRIMARY KEY (name, owner)
);

CREATE TABLE IF NOT EXISTS pet_category ( -- used for browsing, can be breed, specific details about the type, etc
    name            VARCHAR(255),
    owner           VARCHAR(255),
    category        VARCHAR(255)    NOT NULL,
    FOREIGN KEY (name, owner) REFERENCES pets(name, owner) ON DELETE CASCADE,
    PRIMARY KEY (name, owner, category)
);

CREATE TABLE IF NOT EXISTS pet_special_requirements (
    name            VARCHAR(255),
    owner           VARCHAR(255),
    requirement     VARCHAR         NOT NULL,
    description     VARCHAR,
    FOREIGN KEY (name, owner) REFERENCES pets(name, owner) ON DELETE CASCADE,
    PRIMARY KEY (name, owner, requirement)
);

CREATE TABLE IF NOT EXISTS base_prices (
    specified_by    VARCHAR(255)    REFERENCES pcs_admins(user_name),
    pet_type        pet_type        PRIMARY KEY,
    base_price      NUMERIC(10, 2)  NOT NULL CHECK (base_price > 0) -- max 2 d.p.
);

-- INSERT INTO base_prices VALUES ('seanlowjk', 'cat', 40);
-- INSERT INTO base_prices VALUES ('seanlowjk', 'dog', 60);
-- INSERT INTO base_prices VALUES ('seanlowjk', 'bird', 70);
-- INSERT INTO base_prices VALUES ('seanlowjk', 'rabbit', 100);
-- INSERT INTO base_prices VALUES ('seanlowjk', 'rodent', 10);
-- INSERT INTO base_prices VALUES ('seanlowjk', 'fish', 50);
-- INSERT INTO base_prices VALUES ('seanlowjk', 'insect', 30);
-- INSERT INTO base_prices VALUES ('seanlowjk', 'turtle', 20);

-- take leave means minus from availability, must check whether the leave dates are they having pets
-- also need some way (maybe trigger) to enforce constraint where full time care taker need min of 2x150 days availability
-- for part timer, price is part timer set one
-- for full timer, price is based on base_prices + avg rating proportion
-- when we INSERT price i think can use CASE or smthg to set price by case
CREATE TABLE IF NOT EXISTS care_taker_leaves (
    care_taker      VARCHAR(255)    NOT NULL REFERENCES care_takers(user_name)    ON DELETE CASCADE,
    leave_date      DATE            NOT NULL,
    PRIMARY KEY (care_taker, leave_date)
);

-- Table takes care of relation between a pet_type and care_takers
CREATE TABLE IF NOT EXISTS care_takers_pet_preferences (
    care_taker      VARCHAR(255)    NOT NULL REFERENCES care_takers(user_name)      ON DELETE CASCADE,
    pet_type        pet_type        NOT NULL,
    PRIMARY KEY (care_taker, pet_type)
);

-- need trigger for constraint where care taker is holding on to max num of pets already
-- trigger to auto accept acceptable bid for full timers
CREATE TABLE IF NOT EXISTS bids (
    pet             VARCHAR(255)    NOT NULL,
    owner           VARCHAR(255)    NOT NULL,
    care_taker      VARCHAR(255)    NOT NULL,
    pet_type        pet_type        NOT NULL,
    start_date      DATE            NOT NULL,
    end_date        DATE            NOT NULL,
    is_active       BOOLEAN         NOT NULL DEFAULT true,
    is_successful   BOOLEAN         NOT NULL DEFAULT false,
    payment_type    VARCHAR(255),
    transfer_method VARCHAR(255),
    rating          INT             CHECK (rating >= 0),
    review_text     VARCHAR,
    PRIMARY KEY (pet, care_taker, start_date, end_date),
    FOREIGN KEY (pet, owner) REFERENCES pets(name, owner),
    FOREIGN KEY (care_taker, pet_type)
        REFERENCES care_takers_pet_preferences(care_taker, pet_type),
    CONSTRAINT valid_date_range CHECK (start_date <= end_date),
    CONSTRAINT successful_bid_constraint CHECK
        ((NOT is_successful) OR (payment_type IS NOT NULL AND transfer_method IS NOT NULL))
);

-- trigger to update amount and pet day
-- when do you insert and do you need to update?
CREATE TABLE IF NOT EXISTS salary (
    care_taker      VARCHAR(255)    NOT NULL REFERENCES care_takers(user_name)    ON DELETE CASCADE,
    month           CHAR(3)         NOT NULL, -- 3 letter month
    year            CHAR(4)         NOT NULL, -- 4 letter year
    pet_days        INT             NOT NULL DEFAULT 0,
    amount          NUMERIC         NOT NULL DEFAULT 0,
    PRIMARY KEY (care_taker, month, year)
);

CREATE VIEW ratings AS (
    SELECT care_taker, pet_type, rating, review_text
    FROM bids
    WHERE rating IS NOT NULL
);

CREATE VIEW care_takers_rating AS
    SELECT care_taker, AVG(rating) AS avg_rating
    FROM ratings
    GROUP BY care_taker;

-- DROP VIEW pets_full_information;

CREATE VIEW pets_full_information AS 
    SELECT P.name AS pet_name, P.owner AS pet_owner, P.type AS pet_type, 
        U.name AS pet_owner_name, 
        ARRAY_AGG(PC.category) AS pet_categories, 
        ARRAY_AGG(PR.requirement) AS pet_special_requirement, 
        ARRAY_AGG(PR.description) AS pet_requirements_description
    FROM ( 
        pets P
        LEFT OUTER JOIN users U ON P.owner = U.user_name
        LEFT OUTER JOIN pet_category PC ON P.name = PC.name 
        LEFT OUTER JOIN pet_special_requirements PR ON P.name = PR.name 
    )
    GROUP BY (P.name, P.owner, P.type, U.name);

-- Trigger to check if 2 * 150 consecutive days is fulfilled when adding a leave
-- INSERT INTO care_taker_leaves VALUES('seanlowjk', '2020-01-02');
-- INSERT INTO care_taker_leaves VALUES('seanlowjk', '2020-09-01');


-- Create function to get list of available dates for any given caretaker
CREATE OR REPLACE FUNCTION availableDates(the_care_taker VARCHAR(255), the_leave_date date)
RETURNS TABLE ( free_day date )
AS
$$ BEGIN
RETURN QUERY
SELECT *
FROM
(SELECT date_trunc('day', all_dates):: date AS d
    FROM generate_series
        ( (date_trunc('year', now()))::timestamp
        , (date_trunc('year', now()) + interval '1 year' - interval '1 day')::timestamp
        , '1 day'::interval) AS all_dates
EXCEPT
SELECT leave_date
    FROM care_taker_leaves c
    WHERE c.care_taker = the_care_taker
ORDER BY d) AS free_dates
WHERE free_dates.d <> the_leave_date;
END; $$
LANGUAGE plpgsql;


-- Create blocks of 2 *  150 days
CREATE OR REPLACE FUNCTION getBlocks(the_care_taker VARCHAR(255), the_leave_date date)
RETURNS BIGINT
AS
$$ BEGIN
RETURN (
SELECT COUNT(*)
  FROM (
SELECT COUNT(a.free_day) AS days_free, b.free_day AS start_day, c.free_day AS end_day
  FROM
    availableDates(the_care_taker, the_leave_date) AS a,
    availableDates(the_care_taker, the_leave_date) AS b,
    availableDates(the_care_taker, the_leave_date) AS c
  WHERE date(c.free_day) - date(b.free_day) = 149
    AND a.free_day >= b.free_day
    AND a.free_day <= c.free_day
  GROUP BY b.free_day, c.free_day
  HAVING COUNT(a.free_day) = 150
  ORDER BY b.free_day, c.free_day
) AS X, (
SELECT COUNT(a.free_day) AS days_free, b.free_day AS start_day, c.free_day AS end_day
  FROM
    availableDates(the_care_taker, the_leave_date) AS a,
    availableDates(the_care_taker, the_leave_date) AS b,
    availableDates(the_care_taker, the_leave_date) AS c
  WHERE date(c.free_day) - date(b.free_day) = 149
    AND a.free_day >= b.free_day
    AND a.free_day <= c.free_day
  GROUP BY b.free_day, c.free_day
  HAVING COUNT(a.free_day) = 150
  ORDER BY b.free_day, c.free_day
) AS Y
  WHERE date(Y.start_day) >= date(X.end_day));
END; $$
LANGUAGE plpgsql;

-- See if the caretaker can take the leave on the date specified or not.
CREATE OR REPLACE FUNCTION canTakeLeave(the_care_taker VARCHAR(255), the_leave_date date)
RETURNS BOOLEAN
AS
$$ BEGIN
IF ((SELECT getBlocks(the_care_taker, the_leave_date)) >= 1)
THEN
RETURN TRUE;
END IF;
RETURN FALSE;
END; $$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION checkAbleToTakeLeaveFunction()
RETURNS TRIGGER AS
$$ BEGIN
IF (SELECT canTakeLeave(NEW.care_taker, NEW.leave_date)) THEN
RETURN NEW;
END IF;
RETURN NULL;
END; $$ LANGUAGE plpgsql;

CREATE TRIGGER checkAbleToTakeLeave
BEFORE INSERT ON care_taker_leaves
FOR EACH ROW
EXECUTE PROCEDURE checkAbleToTakeLeaveFunction();

CREATE OR REPLACE FUNCTION checkBidAvailabilityFunction()
RETURNS TRIGGER AS
$$ BEGIN
IF ((SELECT COUNT(*)
           FROM care_taker_leaves
           WHERE care_taker = NEW.care_taker AND leave_date >= NEW.start_date AND leave_date <= NEW.end_date)
           = 0) THEN
RETURN NEW;
END IF;
RETURN NULL;
END; $$ LANGUAGE plpgsql;

-- Trigger to check if bid falls between available dates of care taker
CREATE TRIGGER checkBidAvailability
BEFORE INSERT ON bids
FOR EACH ROW
EXECUTE PROCEDURE checkBidAvailabilityFunction();

CREATE OR REPLACE FUNCTION autoAcceptFullTimerBidFunction()
RETURNS TRIGGER AS
$$ BEGIN
IF (((SELECT COUNT(*)
    FROM bids
    WHERE care_taker = NEW.care_taker AND start_date >= NEW.start_date AND end_date <= NEW.end_date AND is_successful) < 5)
    AND
    (SELECT is_part_time FROM care_takers WHERE user_name = NEW.care_taker)
    )
THEN
NEW.is_successful := TRUE;
NEW.payment_type := 'Cash';
NEW.transfer_method := 'Pet Owner Deliver';
END IF;
RETURN NEW;
END; $$ LANGUAGE plpgsql;

-- Trigger for full time care-taker to auto accept bid if it falls between available dates of care taker
CREATE TRIGGER autoAcceptFullTimerBid
BEFORE INSERT ON bids
FOR EACH ROW
EXECUTE PROCEDURE autoAcceptFullTimerBidFunction();


-- Drop table commands for resetting all tables 
-- DROP TABLE care_takers_availability;
-- DROP TABLE pet_special_requirements;
-- DROP TABLE pet_category;
-- DROP TABLE base_prices;
-- DROP TABLE salary;
-- DROP TABLE bids CASCADE;
-- DROP TABLE care_taker_leaves CASCADE;
-- DROP TABLE care_taker CASCADE;
-- DROP TABLE care_takers_pet_preferences CASCADE;
-- DROP TABLE pcs_admins CASCADE;
-- DROP TABLE pet_owners CASCADE;
-- DROP TABLE pets CASCADE;
-- DROP TABLE users CASCADE;
