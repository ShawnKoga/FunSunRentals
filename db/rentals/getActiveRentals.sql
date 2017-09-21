SELECT *
FROM rentals
JOIN customers ON customers.customer_id = rentals.customer_id
WHERE rentals.status = 'OPEN'
ORDER BY end_date;