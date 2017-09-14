SELECT *
FROM rentals
JOIN customers ON customers.customer_id = rentals.customer_id
WHERE rentals.rental_id = $1