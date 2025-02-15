const pool = require('./pool')

async function selectUserById(id) {
  const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])
  return (rows.length)? rows[0] : null;
}
async function findUserByEmail(email) {
  const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [email])
  return (rows.length)? rows[0] : null;
}

async function insertUser(first, last, email, password) {
  await pool.query(`INSERT INTO users (first, last, email, password)
   VALUES ($1, $2, $3, $4)`, [first, last, email, password]);
}
module.exports = {
  findUserByEmail,
  insertUser,
  selectUserById
}