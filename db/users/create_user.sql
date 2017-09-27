INSERT INTO users
(username, email, img, auth_id, admin_status)
VALUES
($1, $2, $3, $4, 'false')
RETURNING *;