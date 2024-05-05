const express = require("express");
const {
  publishRides,
  fetchPublished,
  rideCompleted,
  fetchRide,
  searchRides
} = require("../controllers/user");


const router = express.Router();

// create a user
router.post("/postride", publishRides);

// get all users
router.post("/searchride", searchRides);

// get a user
router.post("/rideid", fetchRide);

// update a user
router.get("/published", fetchPublished);

// delete a user
router.get("/rideCompleted", rideCompleted);

module.exports = router;