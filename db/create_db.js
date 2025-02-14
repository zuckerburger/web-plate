const { Client } = require('pg');
require('dotenv').config();
const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first VARCHAR(15),
  last VARCHAR(15),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(25)
  )
`
async function main() {
  const client = new Client( {
    connectionString: process.env.CONNECTION_STRING
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
}
main();
