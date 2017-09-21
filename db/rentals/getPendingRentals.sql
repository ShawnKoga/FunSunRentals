SELECT *
FROM rentals
WHERE start_date = CURRENT_DATE AND status = 'PENDING';