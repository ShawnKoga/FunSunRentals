
UPDATE paddleboards
SET customer_id = $1,
    rental_id = $2
WHERE pb_id IN
(SELECT pb_id
FROM paddleboards WHERE rental_id IS null
LIMIT $3);

UPDATE kayaks
SET customer_id = $1,
    rental_id = $2
WHERE kayak_id IN
(SELECT kayak_id
FROM kayaks WHERE rental_id IS null
LIMIT $4);

UPDATE roofracks
SET customer_id = $1,
    rental_id = $2
WHERE rack_id IN
(SELECT rack_id
FROM roofracks WHERE rental_id IS null
LIMIT $5);

UPDATE lifejackets
SET customer_id = $1,
    rental_id = $2
WHERE jacket_id IN
(SELECT jacket_id
FROM lifejackets WHERE rental_id IS null
LIMIT $6);

UPDATE rentals
SET status = 'OPEN'
WHERE rental_id = $2 AND status = 'PENDING';

SELECT *
FROM rentals
JOIN customers ON customers.customer_id = rentals.customer_id
WHERE rentals.status = 'OPEN'
ORDER BY end_date;