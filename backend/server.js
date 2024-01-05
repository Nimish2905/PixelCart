const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB();
const app = express();

app.use(express.json()); // to accept json data
app.use("/api/users", userRoutes);
const PORT = process.env.PORT || 5000;

app.listen(
  5000,
  console.log(`Server has started on ports ${process.env.PORT}`)
);