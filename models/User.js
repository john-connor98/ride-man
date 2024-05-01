const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: [true, "Pickup is required"],
      unique: false,
    },
    destination: {
      type: String,
      required: [true, "Drop is required"],
      unique: false,
    },
    date: {
      type: String,
      required: [true, "date is required"],
      unique: false,
    },
    time: {
      type: String,
      required: [true, "time is required"],
      unique: false,
    },
    vehicle: {
      type: String,
      required: [true, "vehicle is required"],
      unique: false,
    },
    vacancy: {
      type: String,
      required: [true, "seats is required"],
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);