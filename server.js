const app = require('./app'); // Import the app from app.js
const db = require('./config/database');
const { createMessageTable } = require('./models/messageModel');

const port = process.env.PORT || 3001;

(async () => {
  try {
    await db.connect(); 
    await createMessageTable();
    console.log('Database connected and messages table created.')
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
})();