const { pool } = require('../config/database');

const createMessageTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        recipient VARCHAR(100) NOT NULL,
        content TEXT NOT NULL,
        delivery_status VARCHAR(50) NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (error) {
    console.error('Error creating messages table:', error);
  }
};

const logMessage = async (message) => {
  try {
    const result = await pool.query(`
      INSERT INTO messages (type, recipient, content, delivery_status)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [message.type, message.recipient, message.content, message.deliveryStatus]);
    return "Message sent successfully";
  } catch (error) {
    console.error('Error logging message:', error);
  }
};

module.exports = { createMessageTable, logMessage };