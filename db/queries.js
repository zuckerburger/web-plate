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

async function findItemByName(name, id) {
  const {rows } = await pool.query(`SELECT * FROM items WHERE id = $1 AND name = $2`, [id, name]);
  return (rows.length)? rows[0] : null;
}
async function insertItem(id, name, price, url) {
  if (!id || !name || !price) return null;
  await pool.query(`INSERT INTO items (id, name, price, url)
    VALUES ($1, $2, $3, $4)`, [id, name, price, url]);
}

async function selectItemsFromUser(id) {
  const { rows } = await pool.query(`SELECT * FROM items WHERE id = $1`, [id]);
  console.log('rows are ' + rows);
  return (rows.length > 0 )? rows : null;
}
module.exports = {
  findUserByEmail,
  insertUser,
  selectUserById,
  insertItem,
  selectItemsFromUser,
  findItemByName
}