SELECT *
FROM rentals
WHERE start_date = $1 AND end_date = $2;