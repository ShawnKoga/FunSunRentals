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