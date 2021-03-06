SELECT *
FROM rentals
JOIN customers ON customers.customer_id = rentals.customer_id
WHERE end_date < CURRENT_DATE AND status = 'OPEN'
ORDER BY end_date ASC;