const express = require('express');
const messageRoutes = require('./routes/messageRoute');
const db = require('./config/database');

const app = express();
app.use(express.json());
app.use('/sendMessage', messageRoutes);

module.exports = app;