import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true); // It ensures that only fields that are specified in out schema will be saved in DB

  // If the database is already connected => don't connect again
  if (connected) {
    console.log("MongoDB connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
