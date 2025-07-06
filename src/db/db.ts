import mongoose from "mongoose";
import dotenv from "dotenv";
import '@/utils/entry';

dotenv.config();

const DatabaseUrl = process.env.DATABASE_URL as string;

let isConnected = false;

const ConnectToDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(DatabaseUrl);
    isConnected = true;
    console.log("✅ pricesphere_DB Connected.");
  } catch (error) {
    console.error("❌ Error connecting to database:", error);
  }
};

const db = mongoose.connection;

export { db };
export default ConnectToDB;
