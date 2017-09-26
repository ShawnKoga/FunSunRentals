SELECT *
FROM rentals
JOIN customers ON customers.customer_id = rentals.customer_id
WHERE end_date > (CURRENT_DATE) AND end_date < (CURRENT_DATE + 7) AND status = 'OPEN'
ORDER BY end_date ASC;
