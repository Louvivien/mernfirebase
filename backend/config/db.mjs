import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();


export default async function (connectionString, app) {
  const client = new MongoClient(connectionString);
  try {
    await client.connect();
    app.locals.db = client.db(process.env.MONGO_COLLECTION);
    console.log("+++ Database connected.");
  } catch (err) {
    await client.close();
    throw new Error("Database connection error.");
  }
}
