const express = require("express");
const {
  publishRides,
  updateUser,
  deleteUser,
  getRide,
  searchRides
} = require("../controllers/user");


const router = express.Router();

// create a user
router.post("/", publishRides);

// get all users
router.get("/searchride", searchRides);

// get a user
router.get("/:id", getRide);

// update a user
router.put("/:id", updateUser);

// delete a user
router.delete("/:id", deleteUser);

module.exports = router;