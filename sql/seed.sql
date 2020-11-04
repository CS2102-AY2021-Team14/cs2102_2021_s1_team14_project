-- db seed TODO
-- need at least 1000 records of both Care Taker and Pet Owner combined

-- FOR USERS ----
-- USE '/register' TO REGISTER on your localhost to register
-- eg. petowner: username: 'po1'
--               password: 'po1'
-- eg. caretakers (FULL TIME) username: 'ftct1'
--                              password: 'ftct1'
-- eg. caretakers (PART TIME) username: 'ptct1'
--                              password: 'ptct1'
-- eg. admins username: 'a1'
--              password: 'a1'
-- Keep incrementing the numbers

-- You should EDIT the details as you wish for your local env
-------- PETS ------------
-- rodents
INSERT INTO pets (name, owner, type) VALUES ('rat1', 'po1', 'rodent');
INSERT INTO pets (name, owner, type) VALUES ('rat2', 'po1', 'rodent');
INSERT INTO pets (name, owner, type) VALUES ('rat3', 'po2', 'rodent');

-- dogs 
INSERT INTO pets (name, owner, type) VALUES ('dog1', 'po1', 'dog');
INSERT INTO pets (name, owner, type) VALUES ('dog2', 'po2', 'dog');
INSERT INTO pets (name, owner, type) VALUES ('dog3', 'po2', 'dog');

-- cats
INSERT INTO pets (name, owner, type) VALUES ('cat1', 'po2', 'cat');


------- care_takers_pet_preferences ---------
INSERT INTO care_takers_pet_preferences (care_taker, pet_type) VALUES ('ftct1', 'rodent');
INSERT INTO care_takers_pet_preferences (care_taker, pet_type) VALUES ('ftct2', 'dog');
INSERT INTO care_takers_pet_preferences (care_taker, pet_type) VALUES ('ftct2', 'cat');
INSERT INTO care_takers_pet_preferences (care_taker, pet_type) VALUES ('ftct3', 'dog');


----------- bids ---------------
INSERT INTO bids (pet, owner, care_taker, pet_type, start_date, end_date, is_active, is_successful, payment_type, transfer_method, rating, review_text)
VALUES ('rat1', 'po1', 'ftct1', 'rodent', '2020-10-02', '2020-10-11', 'false', 'true', 'Cash', 'Pet Owner Delivery', 3, 'Good');

INSERT INTO bids (pet, owner, care_taker, pet_type, start_date, end_date, is_active, is_successful, payment_type, transfer_method, rating, review_text)
VALUES ('rat2', 'po1', 'ftct1', 'rodent', '2020-11-02', '2020-11-11', 'false', 'true', 'Cash', 'Pet Owner Delivery', 5, 'Ok');

INSERT INTO bids (pet, owner, care_taker, pet_type, start_date, end_date, is_active, is_successful, payment_type, transfer_method, rating, review_text)
VALUES ('dog2', 'po2', 'ftct2', 'dog', '2020-11-02', '2020-11-12', 'false', 'true', 'Cash', 'Pet Owner Delivery', 5, 'Nice');

INSERT INTO bids (pet, owner, care_taker, pet_type, start_date, end_date, is_active, is_successful, payment_type, transfer_method, rating, review_text)
VALUES ('dog1', 'po1', 'ftct2', 'dog', '2020-11-13', '2020-11-15', 'false', 'true', 'Cash', 'Pet Owner Delivery', 5, 'Nicely');

INSERT INTO bids (pet, owner, care_taker, pet_type, start_date, end_date, is_active, is_successful, payment_type, transfer_method, rating, review_text)
VALUES ('cat1', 'po2', 'ftct2', 'cat', '2020-11-01', '2020-11-02', 'false', 'true', 'Cash', 'Pet Owner Delivery', 2, 'Ew');

INSERT INTO bids (pet, owner, care_taker, pet_type, start_date, end_date, is_active, is_successful, payment_type, transfer_method, rating, review_text)
VALUES ('dog3', 'po2', 'ftct3', 'dog', '2020-11-01', '2020-11-02', 'false', 'true', 'Cash', 'Pet Owner Delivery', 4, 'Ok not bad');