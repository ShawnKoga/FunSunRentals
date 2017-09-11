UPDATE paddleboards
SET checkout_id = $1,
    rental_id = $2
WHERE id IN
(SELECT id
FROM paddleboards WHERE rental_id IS null
LIMIT 3);