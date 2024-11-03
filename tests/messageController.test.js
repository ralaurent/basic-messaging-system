const request = require('supertest');
const app = require('../app');
const messageController = require('../controllers/messageController');
const { createMessageTable } = require('../models/messageModel');

describe('Message Controller', () => {
  beforeAll(async () => {
    await createMessageTable();
   });
      
  it('should send an email', async () => {
    const response = await request(app).post('/sendMessage').send({
      type: 'email',
      recipient: 'test@example.com',
      content: 'Hello, World!',
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Message sent successfully');
  });

  it('should send an SMS', async () => {
    const response = await request(app).post('/sendMessage').send({
      type: 'SMS',
      recipient: '11234567890',
      content: 'Hello, World!',
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Message sent successfully');
  });

  it('should return an error for invalid type', async () => {
    const response = await request(app).post('/sendMessage').send({
      type: 'not a type',
      recipient: '',
      content: '',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toContain('Type must be "email" or "SMS"');
  });

  it('should return an error for invalid request', async () => {
    const response = await request(app).post('/sendMessage').send({
      type: 'email',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid request');
  });

  it('should return an error for invalid email address', async () => {
    const response = await request(app).post('/sendMessage').send({
      type: 'email',
      recipient: 'not an email',
      content: 'Hello, World!',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('Must be a valid email address');
  });
  
  it('should return an error for invalid phone number', async () => {
    const response = await request(app).post('/sendMessage').send({
      type: 'SMS',
      recipient: 'not an phone number',
      content: 'Hello, World!',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('Must be a valid phone number');
  });
});