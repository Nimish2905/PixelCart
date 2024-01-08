const express = require("express");
const getAllItems = require("../controllers/itemController");
const {
  registerUser,
  authUser,
  getUser,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);

module.exports = router;
