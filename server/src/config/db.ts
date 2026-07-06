import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log("SUCCESSFULLY CONNECTED TO THE DB!");
  } catch (error) {
    console.error("FAILED TO CONNECT TO THE DB!");
    process.exit(1);
  }
};
