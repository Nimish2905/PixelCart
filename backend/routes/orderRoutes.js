const express = require("express");
const placeOrder = require("../controllers/orderController");

const router = express.Router();

router.post("/placeOrder", placeOrder);

module.exports = router;
