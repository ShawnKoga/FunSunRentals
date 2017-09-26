SELECT *
FROM rentals
JOIN customers ON customers.customer_id = rentals.customer_id
WHERE firstname = $1 OR lastname = $2 OR phone = $3 OR email = $4;