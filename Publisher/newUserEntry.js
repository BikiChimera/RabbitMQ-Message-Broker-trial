// cloudLogSender.js
const amqp = require('amqplib');

 async function sendLog({
  firstName,
  lastName,
  country,
  refCountry,
  preferredAiModel,
  email,
  password,
  isActive = false,
  isAdmin = false,
  phoneNumber,
  refreshToken = null,
  isLoggedIn = false,
  sessionToken = null,
  customerID,
  userType = "User",
  planType ,
  auth0UserId,
  subscriptionStatus,
  time = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
  remainingNumberOfQuery,
  remainingNumberOfDocumentUpload
}) {
  const uri = 'amqps://Biki463:9844099035biki@b-05660023-de75-4031-a48a-f2cb47ae5ef2.mq.eu-north-1.on.aws:5671/%2F';
  const queue = 'Neurasix-Bridge';

  const logEntry = {
    firstName,
    lastName,
    country,
    refCountry,
    preferredAiModel,
    email,
    password,
    isActive,
    isAdmin,
    phoneNumber,
    refreshToken,
    isLoggedIn,
    sessionToken,
    customerID,
    userType,
    auth0UserId,
    time: time,
    planType,
    subscriptionStatus,
    remainingNumberOfQuery,
    remainingNumberOfDocumentUpload
    
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
  firstName: "shivam",
  lastName: "raja",
  country: "60d5ec49e1b88f001f9b4c23",
  refCountry: "60d5ec49e1b88f001f9b4c24",
  preferredAiModel: "60d5ec49e1b88f001f9b4c25",
  email: "shivam.raja@example.com",
  password: "hashed_password",
  isActive: true,
  isAdmin: false,
  phoneNumber: "+1234567890",
  refreshToken: null,
  isLoggedIn: true,
  sessionToken: "abc123sessiontoken",
  customerID: "cus_00112233",
  userType: "User",
  auth0UserId: "auth0|123456",
  planType: "Starter",
  subscriptionStatus: "Active",
  remainingNumberOfDocumentUpload: 5,
  remainingNumberOfQuery: 4,
  
}).catch(console.error);
