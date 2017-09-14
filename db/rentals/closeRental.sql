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

UPDATE rentals
SET status = 'CLOSED'
WHERE rental_id = $1;