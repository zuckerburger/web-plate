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
  return (rows.length > 0 )? rows : null;
}

async function deleteMenuItems(names, id) {
  await pool.query(`DELETE FROM items WHERE id = $2 AND name = ANY($1)`, [names, id]);
}

async function insertOrder(userId, items, price) {
  await pool.query(`INSERT INTO orders (user_id, items, price, time)
    VALUES ($1, $2, $3, NOW())`, [userId, JSON.stringify(items), price]);
}

async function selectOrdersFromUser(userId) {
  const { rows } = await pool.query(`SELECT * FROM orders WHERE user_id = $1`, [userId]);
  return (rows.length > 0 )? rows : null;
}

module.exports = {
  findUserByEmail,
  insertUser,
  selectUserById,
  insertItem,
  selectItemsFromUser,
  findItemByName,
  deleteMenuItems,
  insertOrder,
  selectOrdersFromUser
}