// databaseService.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'user_name',
    host: 'localhost',
    database: 'mmk_dump',
    password: '********',
    port: 5432, // Default PostgreSQL port
  });
  
pool.connect()
pool.on("connect", (err)=>{
    console.log("db connected")
})

const databaseService = {
  queryOne: async (query, values) => {
    try {
      const result = await pool.query(query, values);
      return result.rows[0] || null;
    } catch (err) {
      console.error('Database error:', err);
      throw err;
    }
  },
};

module.exports = databaseService;
