const { Pool } = require('pg');
const dbConfig = require('./config/db');
const db = new Pool(dbConfig);

db.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

module.exports = db;