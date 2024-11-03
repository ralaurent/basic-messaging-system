const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { body, validationResult } = require('express-validator');

const validTypes = ['email', 'sms', 'slack'];

const validatePayload = [
  body('type')
      .notEmpty().withMessage('Type cannot be null')
      .isString().withMessage('Type must be a string')
      .custom(value => {
        if (!validTypes.includes(value.toLowerCase())) {
            throw new Error('Type must be "email" or "SMS"');
        }
        return true;
      }),
  body('recipient')
      .notEmpty().withMessage('Recipient cannot be null')
      .isString().withMessage('Recipient must be a string')
      .custom((value, { req }) => {
        const type = req.body.type;
        if (type.toLowerCase() === 'email') {
            if (!/\S+@\S+\.\S+/.test(value)) {
                throw new Error('Must be a valid email address');
            }
        } else if (type.toLowerCase() === 'sms') {
            if (!/^\+?[1-9]\d{1,14}$/.test(value)) { 
                throw new Error('Must be a valid phone number');
            }
        }
        return true;
      }),
  body('content')
      .notEmpty().withMessage('Content cannot be null')
      .isString().withMessage('Content must be a string'),
];

router.post('/', validatePayload, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Invalid request", errors: errors.array() });
    }

    messageController.sendMessage(req, res);
});

module.exports = router;