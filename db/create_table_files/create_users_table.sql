CREATE TABLE users (
user_id SERIAL PRIMARY KEY,
username VARCHAR(180),
email VARCHAR(180),
img TEXT,
auth_id TEXT,
admin_status TEXT
);

CREATE TABLE customers (
customer_id SERIAL PRIMARY KEY,
firstname VARCHAR(180),
lastname VARCHAR(180),
email VARCHAR(180),
phone TEXT,
address TEXT,
city TEXT,
state TEXT,
zip INTEGER,
);

CREATE TABLE rentals (
rental_id SERIAL PRIMARY KEY,
customer_id  INTEGER REFERENCES customers,
start_date DATE,
end_date DATE,
paddleboards INTEGER,
kayaks INTEGER,
roofracks INTEGER,
lifejackets INTEGER,
status VARCHAR(80)
);

CREATE TABLE paddleboards (
pb_id SERIAL PRIMARY KEY,
customer_id  INTEGER REFERENCES customers,
rental_id INTEGER REFERENCES rentals
);

CREATE TABLE kayaks (
kayak_id SERIAL PRIMARY KEY,
customer_id  INTEGER REFERENCES customers,
rental_id INTEGER REFERENCES rentals
);

CREATE TABLE lifejackets (
jacket_id SERIAL PRIMARY KEY,
customer_id  INTEGER REFERENCES customers,
rental_id INTEGER REFERENCES rentals
);

CREATE TABLE roofracks (
rack_id SERIAL PRIMARY KEY,
customer_id  INTEGER REFERENCES customers,
rental_id INTEGER REFERENCES rentals
);