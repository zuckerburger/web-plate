const pool = require('./pool')

async function findUserByEmail(email) {
  const { rows } = await pool.query(`SELECT * FROM users WHERE email=$1`, [email])
  return (rows.length)? rows : null;
}

async function insertUser(first, last, email, password) {
  await pool.query(`INSERT INTO users (first, last, email, password)
   VALUES ($1, $2, $3, $4)`, [first, last, email, password]);
}
module.exports = {
  findUserByEmail,
  insertUser
}