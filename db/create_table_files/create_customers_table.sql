CREATE TABLE customers (
id SERIAL PRIMARY KEY,
firstname VARCHAR(180),
lastname VARCHAR(180),
email VARCHAR(180),
phone TEXT,
address TEXT,
city TEXT,
state TEXT,
zip INTEGER,
);