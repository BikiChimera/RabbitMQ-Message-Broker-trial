// publisher/index.js
const express = require('express');
const amqp = require('amqplib');
const app = express();
app.use(express.json());

const RABBITMQ_URL = 'amqp://localhost';
const QUEUE = 'custom-messages';

let channel;

async function connect() {
  const connection = await amqp.connect(RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertQueue(QUEUE);
}

app.post('/send', async (req, res) => {
  console.log(req.body);
  
  const { name, time, message } = req.body;
  const payload = { name, time, message, timestamp: new Date().toISOString() };

  await channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(payload)));
  console.log('Sent:', payload);
  res.send({ status: 'Message sent', data: payload });
});

app.listen(5000, () => {
  console.log('Publisher listening on port 5000');
  connect();
});
