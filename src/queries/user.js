const getUsers = 'SELECT * FROM user';
const checkEmail = 'SELECT email FROM user WHERE email = ?';
const createUser = 'INSERT INTO user(email, password, createAt) VALUES (?, ?, ?)';
const getUser = 'SELECT * FROM user WHERE id = ?';
const deleteUser = 'DELETE FROM user WHERE id = ?';
const updateUser = 'UPDATE user SET email = ?, password = ?, createAt = ? WHERE id = ?';
module.exports = { getUsers, createUser, checkEmail, getUser, deleteUser, updateUser }