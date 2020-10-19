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
    user_role       pcs_user_role   NOT NULL
);

-- -- -- TODOS other queries