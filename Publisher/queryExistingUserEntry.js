// cloudLogSender.js
const amqp = require('amqplib');

 async function sendLog({userid, time ,operationType,queryType,}) {
  const uri = 'amqps://Biki463:9844099035biki@b-05660023-de75-4031-a48a-f2cb47ae5ef2.mq.eu-north-1.on.aws:5671/%2F';
  const queue = 'Neurasix-Bridge';

  const logEntry = {
    userid: userid,
    event: { 
        operationType: operationType,
        time: time,
        queryType,
         
    }
  };

  try {
    const conn = await amqp.connect(uri);
    const channel = await conn.createChannel();
    await channel.assertQueue(queue, { durable: true });

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(logEntry)));
    console.log("✅ Sent to Cloud Log:", logEntry);

    await channel.close();
    await conn.close();
  } catch (err) {
    console.error("❌ Failed to send log to RabbitMQ:", err);
  }
}

// ✅ Example usage
sendLog({
  userid : "686b94780f2070f6e6df265b",
  time : new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
  operationType: "Query",
  queryType:"normal",

}).catch(console.error);
