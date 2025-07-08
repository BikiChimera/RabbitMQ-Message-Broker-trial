const { MongoClient } = require('mongodb');

// Replace this with your actual MongoDB Atlas connection URI
const uri = "mongodb+srv://21cs191:biki12345@cluster0.nberai4.mongodb.net/Transaction_Database?retryWrites=true&w=majority&appName=cluster0";


const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");

    const db = client.db("Transaction_Database"); // change if needed
    const collection = db.collection("Details_of_Transactions"); // change if needed

    const newData = {
      user: "Biki",
      email: "biki@example.com",
      createdAt: new Date()
    };

    const result = await collection.insertOne(newData);
    console.log("✅ Data inserted with ID:", result.insertedId);
  } catch (error) {
    console.error("❌ Error inserting data:", error);
  } finally {
    await client.close();
    console.log("🔌 Connection closed");
  }
}

run();
