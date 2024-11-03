const { Pool } = require('pg');

let dbConfig;

if (process.env.NODE_ENV === 'production') {
  // Render.com production environment
  dbConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  };
} else {
  // Local development environment
  dbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'communication_service',
    password: 'postgres',
    port: 5432,
  };
}

const pool = new Pool(dbConfig);

const connect = async () => {
  try {
    await pool.connect();
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

module.exports = { pool, connect };