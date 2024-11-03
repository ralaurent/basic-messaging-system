const { logMessage } = require('../models/messageModel');
const { mockMessageSender } = require('../utils/mockMessageSender');

const sendMessage = async (req, res) => {
  try {
    const { type, recipient, content } = req.body;
    const message = { type, recipient, content, deliveryStatus: 'pending' };

    const deliveryStatus = await mockMessageSender(type, message);
    message.deliveryStatus = deliveryStatus;

    const loggedMessage = await logMessage(message);
    res.status(201).json({ message: loggedMessage });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { sendMessage };