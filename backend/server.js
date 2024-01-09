const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/orders", orderRoutes);
const PORT = process.env.PORT || 5000;

app.listen(
  5000,
  console.log(`Server has started on ports ${process.env.PORT}`)
);
