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
      type: Date,
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
      required: [true, "vacancy is required"],
      unique: false,
    },
    state: {
      type: String,
      required: [true, "state is required"],
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);