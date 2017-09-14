CREATE TABLE paddleboards (
pb_id SERIAL PRIMARY KEY,
customer_id  INTEGER REFERENCES customers,
rental_id INTEGER REFERENCES rentals
);