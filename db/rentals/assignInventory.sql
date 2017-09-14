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

UPDATE rentals
SET status = 'OPEN'
WHERE rental_id = $2;