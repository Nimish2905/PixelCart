const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
  {
    src: { type: "String", required: true },
    name: { type: "String", required: true },
    price: {
      type: "String",
      required: true,
    },
  },
  { timestaps: true }
);

const Item = mongoose.model("Shoes", itemSchema);

module.exports = Item;
