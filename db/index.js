import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
  path: "./env",
});
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.log("mongoDB connection error ", err);
    process.exit(1);
  }
};

export default connectDB;
