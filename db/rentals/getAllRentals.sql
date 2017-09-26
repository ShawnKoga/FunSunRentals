SELECT *
FROM rentals
JOIN customers ON customers.customer_id = rentals.customer_id
ORDER BY lastname;