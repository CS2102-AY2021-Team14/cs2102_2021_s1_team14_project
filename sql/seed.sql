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


-- '$2b$10$ECGMcFFd6U52mYt/A/5IsOJEjv9ewouhA.NQQvBSkCDnQUmR2rR9a' is 'pw' encrypted
-- so for all users, can login from frontend with the password 'pw'

---------- USERS ----------

-- pet owners
INSERT INTO users VALUES ('po1', 'Bobby', 'po1@mail.com', '$2b$10$ECGMcFFd6U52mYt/A/5IsOJEjv9ewouhA.NQQvBSkCDnQUmR2rR9a', 'Singapore', '6 Orchard Road S123456');
INSERT INTO pet_owners VALUES ('po1');
INSERT INTO users VALUES ('po2', 'Babby', 'po2@mail.com', '$2b$10$ECGMcFFd6U52mYt/A/5IsOJEjv9ewouhA.NQQvBSkCDnQUmR2rR9a', 'Singapore', '7 Orchard Road S123457');
INSERT INTO pet_owners VALUES ('po2');
INSERT INTO users VALUES ('po3', 'Bebby', 'po3@mail.com', '$2b$10$ECGMcFFd6U52mYt/A/5IsOJEjv9ewouhA.NQQvBSkCDnQUmR2rR9a', 'Singapore', '8 Orchard Road S123458');
INSERT INTO pet_owners VALUES ('po3');
INSERT INTO users VALUES ('po4', 'Bibby', 'po4@mail.com', '$2b$10$ECGMcFFd6U52mYt/A/5IsOJEjv9ewouhA.NQQvBSkCDnQUmR2rR9a', 'Singapore', '9 Orchard Road S123459');
INSERT INTO pet_owners VALUES ('po4');
INSERT INTO users VALUES ('po5', 'Bubby', 'po5@mail.com', '$2b$10$ECGMcFFd6U52mYt/A/5IsOJEjv9ewouhA.NQQvBSkCDnQUmR2rR9a', 'Singapore', '1 Orchard Road S123451');
INSERT INTO pet_owners VALUES ('po5');
INSERT INTO users VALUES ('po6', 'Bbbby', 'po6@mail.com', '$2b$10$ECGMcFFd6U52mYt/A/5IsOJEjv9ewouhA.NQQvBSkCDnQUmR2rR9a', 'Singapore', '2 Orchard Road S123452');
INSERT INTO pet_owners VALUES ('po6');


-- full time care takers
INSERT INTO users VALUES ('ftct1', 'Jane', 'ftct1@mail.com', '$2b$10$ECGMcFFd6U52mYt/A/5IsOJEjv9ewouhA.NQQvBSkCDnQUmR2rR9a', 'Singapore', '1 Tuas Road S654321');
INSERT INTO care_takers VALUES ('ftct1', false, 'Hi I love pets pick me to care for your pets');
INSERT INTO users VALUES ('ftct2', 'Jene', 'ftct2@mail.com', '$2b$10$ECGMcFFd6U52mYt/A/5IsOJEjv9ewouhA.NQQvBSkCDnQUmR2rR9a', 'Singapore', '2 Tuas Road S654322');
INSERT INTO care_takers VALUES ('ftct2', false, 'Hi I love love pets pick me to care for your pets');
INSERT INTO users VALUES ('ftct3', 'Jine', 'ftct3@mail.com', '$2b$10$ECGMcFFd6U52mYt/A/5IsOJEjv9ewouhA.NQQvBSkCDnQUmR2rR9a', 'Singapore', '3 Tuas Road S654323');
INSERT INTO care_takers VALUES ('ftct3', false, 'Hi I love love love pets pick me to care for your pets');
INSERT INTO users VALUES ('ftct4', 'Jone', 'ftct4@mail.com', '$2b$10$ECGMcFFd6U52mYt/A/5IsOJEjv9ewouhA.NQQvBSkCDnQUmR2rR9a', 'Singapore', '4 Tuas Road S654324');
INSERT INTO care_takers VALUES ('ftct4', false, 'Hi I love love love love pets pick me to care for your pets');
INSERT INTO users VALUES ('ftct5', 'June', 'ftct5@mail.com', '$2b$10$ECGMcFFd6U52mYt/A/5IsOJEjv9ewouhA.NQQvBSkCDnQUmR2rR9a', 'Singapore', '5 Tuas Road S654325');
INSERT INTO care_takers VALUES ('ftct5', false, 'Hi I love love love love love pets pick me to care for your pets');
INSERT INTO users VALUES ('ftct6', 'Jjne', 'ftct6@mail.com', '$2b$10$ECGMcFFd6U52mYt/A/5IsOJEjv9ewouhA.NQQvBSkCDnQUmR2rR9a', 'Singapore', '6 Tuas Road S654326');
INSERT INTO care_takers VALUES ('ftct6', false, 'Hi I love love love love love love pets pick me to care for your pets');

-- part time care takers
INSERT INTO users VALUES ('ptct1', 'Tom', 'ptct1@mail.com', '$2b$10$ECGMcFFd6U52mYt/A/5IsOJEjv9ewouhA.NQQvBSkCDnQUmR2rR9a', 'Singapore', '1 Changi Road S111111');
INSERT INTO care_takers VALUES ('ptct1', true, 'cheap pet care');
INSERT INTO users VALUES ('ptct2', 'Tam', 'ptct2@mail.com', '$2b$10$ECGMcFFd6U52mYt/A/5IsOJEjv9ewouhA.NQQvBSkCDnQUmR2rR9a', 'Singapore', '2 Changi Road S111112');
INSERT INTO care_takers VALUES ('ptct2', true, 'cheaper pet care');
INSERT INTO users VALUES ('ptct3', 'Tem', 'ptct3@mail.com', '$2b$10$ECGMcFFd6U52mYt/A/5IsOJEjv9ewouhA.NQQvBSkCDnQUmR2rR9a', 'Singapore', '3 Changi Road S111113');
INSERT INTO care_takers VALUES ('ptct3', true, 'cheapest pet care');
INSERT INTO users VALUES ('ptct4', 'Tim', 'ptct4@mail.com', '$2b$10$ECGMcFFd6U52mYt/A/5IsOJEjv9ewouhA.NQQvBSkCDnQUmR2rR9a', 'Singapore', '4 Changi Road S111114');
INSERT INTO care_takers VALUES ('ptct4', true, 'cheaperer pet care');
INSERT INTO users VALUES ('ptct5', 'Tum', 'ptct5@mail.com', '$2b$10$ECGMcFFd6U52mYt/A/5IsOJEjv9ewouhA.NQQvBSkCDnQUmR2rR9a', 'Singapore', '5 Changi Road S111115');
INSERT INTO care_takers VALUES ('ptct5', true, 'cheaperest pet care');
INSERT INTO users VALUES ('ptct6', 'Ttm', 'ptct6@mail.com', '$2b$10$ECGMcFFd6U52mYt/A/5IsOJEjv9ewouhA.NQQvBSkCDnQUmR2rR9a', 'Singapore', '6 Changi Road S111116');
INSERT INTO care_takers VALUES ('ptct6', true, 'cheapestest pet care');

-- admins
INSERT INTO users VALUES ('a1', 'Alice', 'a1@mail.com', '$2b$10$ECGMcFFd6U52mYt/A/5IsOJEjv9ewouhA.NQQvBSkCDnQUmR2rR9a', 'Singapore', '1 Sengkang Road S000001');
INSERT INTO pcs_admins VALUES ('a1');
INSERT INTO users VALUES ('a2', 'Elice', 'a2@mail.com', '$2b$10$ECGMcFFd6U52mYt/A/5IsOJEjv9ewouhA.NQQvBSkCDnQUmR2rR9a', 'Singapore', '2 Sengkang Road S000002');
INSERT INTO pcs_admins VALUES ('a2');
INSERT INTO users VALUES ('a3', 'Ilice', 'a3@mail.com', '$2b$10$ECGMcFFd6U52mYt/A/5IsOJEjv9ewouhA.NQQvBSkCDnQUmR2rR9a', 'Singapore', '3 Sengkang Road S000003');
INSERT INTO pcs_admins VALUES ('a3');
INSERT INTO users VALUES ('a4', 'Olice', 'a4@mail.com', '$2b$10$ECGMcFFd6U52mYt/A/5IsOJEjv9ewouhA.NQQvBSkCDnQUmR2rR9a', 'Singapore', '4 Sengkang Road S000004');
INSERT INTO pcs_admins VALUES ('a4');
INSERT INTO users VALUES ('a5', 'Ulice', 'a5@mail.com', '$2b$10$ECGMcFFd6U52mYt/A/5IsOJEjv9ewouhA.NQQvBSkCDnQUmR2rR9a', 'Singapore', '5 Sengkang Road S000005');
INSERT INTO pcs_admins VALUES ('a5');
INSERT INTO users VALUES ('a6', 'Llice', 'a6@mail.com', '$2b$10$ECGMcFFd6U52mYt/A/5IsOJEjv9ewouhA.NQQvBSkCDnQUmR2rR9a', 'Singapore', '6 Sengkang Road S000006');
INSERT INTO pcs_admins VALUES ('a6');


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
INSERT INTO pets (name, owner, type) VALUES ('cat2', 'po3', 'cat');

-- birds
INSERT INTO pets (name, owner, type) VALUES ('bird1', 'po3', 'bird');

-- rabbits
INSERT INTO pets (name, owner, type) VALUES ('rabbit1', 'po4', 'rabbit');

-- fish
INSERT INTO pets (name, owner, type) VALUES ('fish1', 'po5', 'fish');

-- insect
INSERT INTO pets (name, owner, type) VALUES ('insect1', 'po6', 'insect');

-- turtle
INSERT INTO pets (name, owner, type) VALUES ('turtle1', 'po3', 'turtle');


--------- pet_category -------

-- rodents
INSERT INTO pet_category VALUES ('rat1', 'po1', 'rat');
INSERT INTO pet_category VALUES ('rat1', 'po1', 'smelly');
INSERT INTO pet_category VALUES ('rat1', 'po1', 'big rodent');
INSERT INTO pet_category VALUES ('rat2', 'po1', 'hamster');
INSERT INTO pet_category VALUES ('rat3', 'po2', 'hamster');

-- dogs 
INSERT INTO pet_category VALUES ('dog1', 'po1', 'big dog');
INSERT INTO pet_category VALUES ('dog1', 'po1', 'golden retriever');
INSERT INTO pet_category VALUES ('dog2', 'po2', 'big dog');
INSERT INTO pet_category VALUES ('dog2', 'po2', 'shiba inu');
INSERT INTO pet_category VALUES ('dog2', 'po2', 'cute');
INSERT INTO pet_category VALUES ('dog3', 'po2', 'small dog');
INSERT INTO pet_category VALUES ('dog3', 'po2', 'chihuahua');
INSERT INTO pet_category VALUES ('dog3', 'po2', 'hairless');

-- cats
INSERT INTO pet_category VALUES ('cat1', 'po2', 'cute');


--------- pet_special_requirements -------

-- rodents
INSERT INTO pet_special_requirements VALUES ('rat1', 'po1', 'needs medication', 'needs to be fed smell reducing medication every 10min');
INSERT INTO pet_special_requirements VALUES ('rat1', 'po1', 'needs music', 'needs to listen to music 24/7');
INSERT INTO pet_special_requirements VALUES ('rat2', 'po1', 'needs walks', 'needs to be walked daily');

-- dogs
INSERT INTO pet_special_requirements VALUES ('dog1', 'po1', 'needs walks', 'needs to be walked daily');
INSERT INTO pet_special_requirements VALUES ('dog2', 'po2', 'needs walks', 'needs to be walked daily');
INSERT INTO pet_special_requirements VALUES ('dog3', 'po2', 'has separation anxiety', 'my poor doggie cant be left alone');

-- cats
INSERT INTO pet_special_requirements VALUES ('cat1', 'po2', 'dietary requirements', 'only eats fresh tuna');
INSERT INTO pet_special_requirements VALUES ('cat2', 'po3', 'dietary requirements', 'only eats wet food');


------- care_takers_pet_preferences ---------
INSERT INTO care_takers_pet_preferences (care_taker, pet_type) VALUES ('ftct1', 'rodent');
INSERT INTO care_takers_pet_preferences (care_taker, pet_type) VALUES ('ftct2', 'dog');
INSERT INTO care_takers_pet_preferences (care_taker, pet_type) VALUES ('ftct2', 'cat');
INSERT INTO care_takers_pet_preferences (care_taker, pet_type) VALUES ('ftct3', 'dog');
INSERT INTO care_takers_pet_preferences (care_taker, pet_type) VALUES ('ftct3', 'rabbit');
INSERT INTO care_takers_pet_preferences (care_taker, pet_type) VALUES ('ftct3', 'bird');
INSERT INTO care_takers_pet_preferences (care_taker, pet_type) VALUES ('ftct3', 'turtle');
INSERT INTO care_takers_pet_preferences (care_taker, pet_type) VALUES ('ftct4', 'turtle');
INSERT INTO care_takers_pet_preferences (care_taker, pet_type) VALUES ('ftct4', 'dog');
INSERT INTO care_takers_pet_preferences (care_taker, pet_type) VALUES ('ftct4', 'cat');
INSERT INTO care_takers_pet_preferences (care_taker, pet_type) VALUES ('ftct5', 'insect');
INSERT INTO care_takers_pet_preferences (care_taker, pet_type) VALUES ('ftct6', 'fish');

INSERT INTO care_takers_pet_preferences (care_taker, pet_type, price) VALUES ('ptct1', 'cat', 29.4);
INSERT INTO care_takers_pet_preferences (care_taker, pet_type, price) VALUES ('ptct1', 'dog', 23.4);
INSERT INTO care_takers_pet_preferences (care_taker, pet_type, price) VALUES ('ptct1', 'rabbit', 16.8);
INSERT INTO care_takers_pet_preferences (care_taker, pet_type, price) VALUES ('ptct1', 'rodent', 6.8);
INSERT INTO care_takers_pet_preferences (care_taker, pet_type, price) VALUES ('ptct1', 'insect', 11.8);
INSERT INTO care_takers_pet_preferences (care_taker, pet_type, price) VALUES ('ptct2', 'rodent', 7.8);
INSERT INTO care_takers_pet_preferences (care_taker, pet_type, price) VALUES ('ptct2', 'dog', 47.8);
INSERT INTO care_takers_pet_preferences (care_taker, pet_type, price) VALUES ('ptct2', 'cat', 88.8);
INSERT INTO care_takers_pet_preferences (care_taker, pet_type, price) VALUES ('ptct3', 'cat', 24.5);
INSERT INTO care_takers_pet_preferences (care_taker, pet_type, price) VALUES ('ptct3', 'rodent', 10.8);
INSERT INTO care_takers_pet_preferences (care_taker, pet_type, price) VALUES ('ptct3', 'fish', 9.8);
INSERT INTO care_takers_pet_preferences (care_taker, pet_type, price) VALUES ('ptct4', 'fish', 18.8);
INSERT INTO care_takers_pet_preferences (care_taker, pet_type, price) VALUES ('ptct4', 'cat', 23.8);
INSERT INTO care_takers_pet_preferences (care_taker, pet_type, price) VALUES ('ptct5', 'dog', 29.8);
INSERT INTO care_takers_pet_preferences (care_taker, pet_type, price) VALUES ('ptct6', 'insect', 50);
INSERT INTO care_takers_pet_preferences (care_taker, pet_type, price) VALUES ('ptct6', 'turtle', 123);


------- care_taker_leaves ------------
-- TODO

------- salary ------------
-- TODO

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

"""
INSERT INTO bids (pet, owner, care_taker, pet_type, start_date, end_date, is_active, is_successful, payment_type, transfer_method, rating, review_text)
VALUES ('rat1', 'po1', 'ftct1', 'rodent', '2020-11-01', '2020-11-02', 'false', 'true', 'Cash', 'Pet Owner Delivery', NULL, NULL);
"""

-------- BASE PRICES -------
INSERT INTO base_prices VALUES ('a1', 'cat', 88);
INSERT INTO base_prices VALUES ('a1', 'dog', 77);
INSERT INTO base_prices VALUES ('a1', 'bird', 68.5);
INSERT INTO base_prices VALUES ('a1', 'rabbit', 72);
INSERT INTO base_prices VALUES ('a1', 'rodent', 22);
INSERT INTO base_prices VALUES ('a1', 'fish', 58);
INSERT INTO base_prices VALUES ('a1', 'insect', 12.5);
INSERT INTO base_prices VALUES ('a1', 'turtle', 62);
