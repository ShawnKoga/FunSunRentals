CREATE TABLE rentals (
id SERIAL PRIMARY KEY,
customer_id  INTEGER REFERENCES customers,
start_date DATE,
end_date DATE
);