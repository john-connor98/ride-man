const User = require("../models/User");

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

    const publishedRides = await User.create({
      source, destination, date, time, vehicle, vacancy
    });

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

  try {
    const rides = await User.find({ source: source, destination: destination, vacancy: vacancy, date: date}, 'source destination vacancy date');

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
  if (!task_id || !token) {
    res.status(400);
    return next(new Error("fields are empty"));
  }
  try {
    const user = await User.findById(task_id);

    if (!user) {
      res.status(404);
      return next(new Error("User not found"));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(404);
      return next(new Error("User not found"));
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(404);
      return next(new Error("User not found"));
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User has been deleted.",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = {
  fetchRide,
  searchRides,
  publishRides,
  updateUser,
  deleteUser,
};