INSERT INTO rentals
(customer_id, start_date, end_date, paddleboards, kayaks, status)
VALUES
($1, $2, $3, $4, $5, 'PENDING')
RETURNING *;