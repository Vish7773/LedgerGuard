import mongoose from "mongoose";
import { config } from "./env.js";

const connectDatabase = async () => {
  try {
    await mongoose.connect(config.mongoURI);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDatabase;