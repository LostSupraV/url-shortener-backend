import mongoose from "mongoose";
import { mongo_shortener_uri } from "../env/env.js";

export const connectDB = async () => {
  try {
    const uri = mongo_shortener_uri;
    await mongoose.connect(uri);
    console.log("MONGODB ATLAS: Connection Established");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
