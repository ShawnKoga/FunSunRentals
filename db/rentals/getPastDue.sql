SELECT COUNT(*)
FROM rentals
WHERE end_date < CURRENT_DATE AND status = 'OPEN'