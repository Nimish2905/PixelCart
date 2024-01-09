const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    orderNo: { type: "String", required: true },
    orderItems: { type: [String], required: true },
    orderTotalCost: { type: "String", required: true },
    orderPlacedBy: {
      type: "String",
      required: true,
    },
  },
  { timestaps: true }
);

const Order = mongoose.model("Orders", orderSchema);

module.exports = Order;
