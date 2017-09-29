SELECT *
FROM customers
WHERE firstname = $1 AND lastname = $2 AND phone = $3;