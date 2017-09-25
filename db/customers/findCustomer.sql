SELECT *
FROM customers
WHERE firstname = $1 OR lastname = $2 OR phone = $3 OR email = $4;