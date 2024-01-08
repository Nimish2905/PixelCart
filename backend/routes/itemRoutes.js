const express = require("express");
const getAllItems = require("../controllers/itemController");

const router = express.Router();

router.post("/getAllShoes", getAllItems);

module.exports = router;
