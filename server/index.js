import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import navigateRouter from "./routes/routes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5500;

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/electricalStore")
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Error: ", err.message));

app.use("/", navigateRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
