-- -- CREATE DATABASE yogapets;

-- changed to separate table as pet owner and care taker may use the same account
-- CREATE TYPE pcs_user_role AS ENUM ('ADMIN', 'CARETAKER', 'OWNER');

CREATE TYPE pet_type AS ENUM ('cat', 'dog', 'bird', 'rabbit', 'rodent', 'fish', 'insect', 'turtle');
-- rodent will include hamster, guinea pig, mouse, rat, gerbil,
-- turtle will include tortoise and terrapin
-- all these 'sub-type' will be category

-- Users
CREATE TABLE users (
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

CREATE TABLE pet_owners (
    user_name       VARCHAR(255)    PRIMARY KEY REFERENCES users(user_name)
);

CREATE TABLE care_takers (
    user_name       VARCHAR(255)    PRIMARY KEY REFERENCES users(user_name),
    is_part_time    BOOLEAN         NOT NULL,
    introduction    VARCHAR
);

CREATE TABLE pcs_admins (
    user_name       VARCHAR(255)    PRIMARY KEY REFERENCES users(user_name)
);

CREATE TABLE pets (
    name            VARCHAR(255)    NOT NULL,
    owner           VARCHAR(255)    NOT NULL REFERENCES pet_owners(user_name)     ON DELETE CASCADE,
    type            pet_type        NOT NULL,
    PRIMARY KEY (name, owner)
);

CREATE TABLE pet_category ( -- used for browsing, can be breed, specific details about the type, etc
    name            VARCHAR(255),
    owner           VARCHAR(255),
    category        VARCHAR(255)    NOT NULL,
    FOREIGN KEY (name, owner) REFERENCES pets(name, owner) ON DELETE CASCADE,
    PRIMARY KEY (name, owner, category)
);

CREATE TABLE pet_special_requirements (
    name            VARCHAR(255),
    owner           VARCHAR(255),
    requirement     VARCHAR         NOT NULL,
    description     VARCHAR,
    FOREIGN KEY (name, owner) REFERENCES pets(name, owner) ON DELETE CASCADE,
    PRIMARY KEY (name, owner, requirement)
);

CREATE TABLE base_prices (
    specified_by    VARCHAR(255)    REFERENCES pcs_admins(user_name),
    pet_type        pet_type        PRIMARY KEY,
    base_price      NUMERIC(10, 2)  NOT NULL CHECK (base_price > 0) -- max 2 d.p.
);

-- take leave means minus from availability, must check whether the leave dates are they having pets
-- also need some way (maybe trigger) to enforce constraint where full time care taker need min of 2x150 days availability
-- for part timer, price is part timer set one
-- for full timer, price is based on base_prices + avg rating proportion
-- when we INSERT price i think can use CASE or smthg to set price by case
CREATE TABLE care_takers_availability (
    care_taker      VARCHAR(255)    NOT NULL REFERENCES care_takers(user_name)    ON DELETE CASCADE, 
    start_date      DATE            NOT NULL,
    end_date        DATE            NOT NULL,
    pet_type        pet_type        NOT NULL,
    daily_price     NUMERIC(10, 2)  NOT NULL CHECK (daily_price > 0),
    is_outdated      BOOLEAN         NOT NULL DEFAULT false,
        -- become true when this period become split up when reach max num pets or care taker apply leave
    PRIMARY KEY (care_taker, start_date, end_date, pet_type),
    CONSTRAINT valid_date_range CHECK (start_date <= end_date)
);

-- need trigger for constraint where care taker is holding on to max num of pets already
-- trigger to auto accept acceptable bid for full timers
CREATE TABLE bids (
    pet             VARCHAR(255)    NOT NULL,
    owner           VARCHAR(255)    NOT NULL,
    care_taker      VARCHAR(255)    NOT NULL,
    care_taker_availability_start
                    DATE            NOT NULL,
    care_taker_availability_end
                    DATE            NOT NULL,
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
    FOREIGN KEY (care_taker, care_taker_availability_start, care_taker_availability_end, pet_type)
        REFERENCES care_takers_availability(care_taker, start_date, end_date, pet_type),
    CONSTRAINT valid_date_range CHECK (start_date <= end_date),
    CONSTRAINT successful_bid_constraint CHECK 
        ((NOT is_successful) OR (payment_type IS NOT NULL AND transfer_method IS NOT NULL))
);

-- trigger to update amount and pet day
CREATE TABLE salary (
    care_taker      VARCHAR(255)    NOT NULL REFERENCES care_takers(user_name)    ON DELETE CASCADE,
    month           CHAR(3)         NOT NULL, -- 3 letter month
    year            CHAR(4)         NOT NULL, -- 4 letter year
    pet_days        INT             NOT NULL DEFAULT 0,
    amount          NUMERIC         NOT NULL DEFAULT 0,
    PRIMARY KEY (care_taker, month, year)
);

CREATE VIEW ratings AS
    SELECT care_taker, pet_type, rating, review_text
    FROM bids
    WHERE rating IS NOT NULL;

CREATE VIEW care_takers_rating AS
    SELECT care_taker, AVG(rating) AS avg_rating
    FROM ratings
    GROUP BY care_taker;
