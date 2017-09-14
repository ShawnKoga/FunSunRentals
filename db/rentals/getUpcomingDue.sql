SELECT *
FROM rentals
WHERE end_date > (CURRENT_DATE) AND end_date < (CURRENT_DATE + 7)