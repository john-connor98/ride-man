const User = require("../models/User");
var mongoose = require('mongoose');

const publishRides = async (req, res, next) => {
  try {
    const { source, destination, date, time, vehicle, vacancy, stopoverData, token} = req.body;
    // if (!source || !destination || !date || !time || !vehicle || vacancy==0) {
    //   res.status(400);
    //   return next(new Error("Fields are empty"));
    // }

    // check if user already exists
    //const isUserExists = await User.findOne({ email });

    // if (isUserExists) {
    //   res.status(404);
    //   return next(new Error("User already exists"));
    // }
    console.log(typeof(stopoverData));
    state = "published";
    const publishedRides = await User.create({
      source, destination, date, time, vehicle, vacancy, state});
    for(stopOver in stopoverData) {
      const {stopSource, stopDestination, stopPrice} = stopOver.body;
      console.log(stopDestination);
     
      // User.create({ stopSource, stopDestination, date, time, vehicle, vacancy
      // });
    }

    res.status(200).json({
      status: 200,
      message: "success",
      identity: "identity",
      active_sessions: 1,
      travel_list: publishedRides
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

const searchRides = async (req, res, next) => {

  const { source, destination, token, vacancy, date} = req.body;
  if (!source || !destination || !vacancy || !date) {
    res.status(400);
    return next(new Error("fields are empty"));
  }
  da = new Date(date);
  try {
    const rides = await User.find({ source: source, destination: destination, vacancy: vacancy, date: da}, 'source destination vacancy date');

    res.status(200).json({
      status: 200,
      message: "success",
      identity: "identity",
      active_sessions: 1,
      travel_list: rides
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const fetchRide = async (req, res, next) => {

  const {task_id , token} = req.body;
  // if (!task_id || !token) {
  //   res.status(400);
  //   return next(new Error("fields are empty"));
  // }
  try {
    objectId = new mongoose.Types.ObjectId(task_id);
    const user = await User.findById(objectId);

    if (!user) {
      res.status(404);
      return next(new Error("User not found"));
    }

    console.log(`chetan user source data ${typeof(user.source)}`)

    res.status(200).json({
      status: 200,
      message: "success",
      identity: "identity",
      active_sessions: 1,
      pickup_location: user.source,
      drop_location: user.destination,
      date: user.date,
      pickup_time: "11:34",
      drop_time: "8:30",
      distance: 8,
      fare: 145,
      rating: 4,
      review_count: 35,
      verified_profile: true,
      cancel_cnt: 1,
      guide_info: {
        "luggage_details":"Only handbag allowed",
        "seat_guide_details":"2"
      },
      share_url: "put url here",
      driver_info:{
        "name":"chetan",
        "rating":"5",
        "contact":"8744910956"
      },
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const fetchPublished = async (req, res, next) => {
  try {
    const user = await User.find();

    // if (!user) {
    //   res.status(404);
    //   return next(new Error("User not found"));
    // }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const rideCompleted = async (res, next) => {
  // try {
  //   const user = await User.findById(id);

  //   if (!user) {
  //     res.status(404);
  //     return next(new Error("User not found"));
  //   }

    // await User.findByIdAndDelete(id);
    id = "";
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: "state"
      },
      {
        new: "completed",
      }
    );

    res.status(200).json({
      success: true,
      message: "Ride marked completed",
    });
};

module.exports = {
  fetchRide,
  searchRides,
  publishRides,
  fetchPublished,
  rideCompleted,
};