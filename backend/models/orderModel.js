const mongoose = require("mongoose");

const orderItemSchema = mongoose.Schema({
  itemName: { type: String, required: true },
  itemQuantity: { type: Number, required: true },
});

const orderSchema = mongoose.Schema(
  {
    orderNo: { type: String, required: true },
    orderItems: { type: [orderItemSchema], required: true },
    orderTotalCost: { type: String, required: true },
    orderPlacedBy: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Orders", orderSchema);

module.exports = Order;
