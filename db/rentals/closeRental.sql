UPDATE paddleboards
SET customer_id = null,
    rental_id = null
WHERE pb_id IN
(SELECT pb_id
FROM paddleboards WHERE rental_id = $1);

UPDATE kayaks
SET customer_id = null,
    rental_id = null
WHERE kayak_id IN
(SELECT kayak_id
FROM kayaks WHERE rental_id = $1);

UPDATE roofracks
SET customer_id = null,
    rental_id = null
WHERE rack_id IN
(SELECT rack_id
FROM roofracks WHERE rental_id = $1);

UPDATE lifejackets
SET customer_id = null,
    rental_id = null
WHERE jacket_id IN
(SELECT jacket_id
FROM lifejackets WHERE rental_id = $1);

UPDATE rentals
SET status = 'CLOSED'
WHERE rental_id = $1;

SELECT *
FROM rentals
JOIN customers ON customers.customer_id = rentals.customer_id
WHERE rentals.status = 'OPEN'
ORDER BY end_date;