const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

const placeOrder = asyncHandler(async (req, res) => {
  const { orderNo, itemNamesArray, orderTotalCost, orderPlacedBy } = req.body;

  if (!orderNo || !itemNamesArray || !orderTotalCost || !orderPlacedBy) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }

  const orderNumberExists = await Order.findOne({ orderNo });

  if (orderNumberExists) {
    res.status(400);
    throw new Error("Order Number Duplicate");
  }

  const order = await Order.create({
    orderNo,
    orderItems: itemNamesArray,
    orderTotalCost,
    orderPlacedBy,
  });

  if (order) {
    res.status(201).json({
      _id: order._id,
      orderNo: order.orderNo,
      orderItems: order.orderItems,
      orderPlacedBy: order.orderPlacedBy,
    });
  } else {
    res.status(400);
    throw new Error("Order not found");
  }
});

module.exports = placeOrder;
