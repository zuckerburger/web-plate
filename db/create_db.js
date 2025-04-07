const { Client } = require('pg');
require('dotenv').config();
const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first VARCHAR(15),
  last VARCHAR(15),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(25)
  );

CREATE TABLE IF NOT EXISTS items (
  id INTEGER,
  name VARCHAR(30),
  price NUMERIC,
  url TEXT
);

CREATE TABLE IF NOT EXISTS orders (
  order_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER,
  items JSON,
  price NUMERIC,
  time TIMESTAMP
);
`
async function main() {
  const client = new Client( {
    connectionString: process.env.CONNECTION_STRING,
    ssl: {
      rejectUnauthorized: false
    }
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
}
main();
