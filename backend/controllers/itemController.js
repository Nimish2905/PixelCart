const asyncHandler = require("express-async-handler");
const Item = require("../models/itemModels");

const getAllItems = asyncHandler(async (req, res) => {
  const itemExists = await Item.find({});
    console.log(itemExists);
  if (itemExists) {
    res.send(itemExists);

    console.warn(itemExists);
  } else {
    res.status(400);
    throw new Error("Item exists");
  }
});

module.exports = getAllItems;
