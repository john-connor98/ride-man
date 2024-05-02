const express = require("express");
const {
  publishRides,
  updateUser,
  deleteUser,
  fetchRide,
  searchRides
} = require("../controllers/user");


const router = express.Router();

// create a user
router.post("/postride", publishRides);

// get all users
router.post("/searchride", searchRides);

// get a user
router.get("/rideid", fetchRide);

// update a user
router.put("/:id", updateUser);

// delete a user
router.delete("/:id", deleteUser);

module.exports = router;