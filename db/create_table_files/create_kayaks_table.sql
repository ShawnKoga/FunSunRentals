CREATE TABLE kayaks (
id SERIAL PRIMARY KEY,
checkout_id  INTEGER REFERENCES customers,
rental_id INTEGER REFERENCES rentals
);