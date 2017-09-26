SELECT *
FROM rentals
JOIN customers ON customers.customer_id = rentals.customer_id
WHERE status = 'PENDING'
ORDER BY start_date ASC;