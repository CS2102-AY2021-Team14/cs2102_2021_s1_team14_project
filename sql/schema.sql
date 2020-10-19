-- -- CREATE DATABASE yogapets;

-- UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE pcs_user_role AS ENUM ('ADMIN', 'CARETAKER', 'OWNER');

-- Users
CREATE TABLE IF NOT EXISTS users (
    user_id         uuid            PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name       VARCHAR(255)    NOT NULL,
    user_email      VARCHAR(255)    NOT NULL,
    user_password   VARCHAR(255)    NOT NULL,
    user_country    VARCHAR(30)     NOT NULL,
    user_address    VARCHAR(255)    NOT NULL,
    user_role       pcs_user_role   NOT NULL
);

-- Example invalid insert into user table
INSERT INTO users (user_name, user_email, user_password, user_country, user_address, user_role) VALUES ('ching', 'ben@ben.com', 'a', 'si', 'anos', 'BANANA');

-- Example acceptable with bcrypt
INSERT INTO users (user_name, user_email, user_password, user_country, user_address, user_role) VALUES ('ching', 'ben@ben.com', 'a', 'si', 'anos', 'OWNER');

-- -- -- TODOS other queries