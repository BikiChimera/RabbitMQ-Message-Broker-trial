// consumer/index.js
const express = require('express');
const amqp = require('amqplib');
const app = express();

const AWSMQ_URL = 'amqps://Biki463:9844099035biki@b-05660023-de75-4031-a48a-f2cb47ae5ef2.mq.eu-north-1.on.aws:5671/%2F';

const QUEUE = 'custom-messages';

let channel;

async function connectAndConsume() {
  const connection = await amqp.connect(AWSMQ_URL);
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
