const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URL;
// mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, { useNewUrlPArser: true });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;