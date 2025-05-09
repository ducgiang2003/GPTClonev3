import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.DB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export const connectDB = async () => {
  await client.connect();
  console.log("MongoDB connected");
};

export const db = client.db("AI-Platform"); // export sẵn database
export const Conversation = db.collection("Conversation"); // export collection luôn

export default client;
