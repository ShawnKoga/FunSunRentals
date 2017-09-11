INSERT INTO customers
(firstname, lastname, email, phone, address, city, state, zip)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *;