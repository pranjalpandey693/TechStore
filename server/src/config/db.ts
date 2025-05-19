import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: process.env.DB_NAME,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,

    });
    console.log("Mongodb connected");
  } catch (err) {
    console.error("Mongodb connection failed", err);
    process.exit(1);
  }
};

export default connectDB;
