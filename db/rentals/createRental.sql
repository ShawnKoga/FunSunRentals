INSERT INTO rentals
(customer_id, start_date, end_date, paddleboards, kayaks, roofracks, lifejackets, status)
VALUES
($1, $2, $3, $4, $5, $6, $7, 'PENDING')
RETURNING *;