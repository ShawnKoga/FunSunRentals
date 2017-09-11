SELECT *
FROM rentals
WHERE customer_id IN (SELECT id
                      FROM customers
                      WHERE firstname = $1 AND lastname = $2);