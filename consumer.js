// consumer/index.js
const express = require('express');
const amqp = require('amqplib');
const app = express();

const RABBITMQ_URL = 'amqp://localhost';
const QUEUE = 'custom-messages';

let channel;

async function connectAndConsume() {
  const connection = await amqp.connect(RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertQueue(QUEUE);

  channel.consume(QUEUE, msg => {
    const data = JSON.parse(msg.content.toString());
    console.log('Received:', data);
    // Acknowledge the message
    channel.ack(msg);
  });
}

app.listen(5001, () => {
  console.log('Consumer listening on port 5001');
  connectAndConsume();
});
