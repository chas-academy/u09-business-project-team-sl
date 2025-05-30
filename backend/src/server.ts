import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import rawgRoutes from "./routes/rawg";
import authRoutes from "./routes/auth";
import listRoutes from "./routes/list";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", rawgRoutes); // RAWG API
app.use("/api/auth", authRoutes);
app.use("/api/lists", listRoutes);

// Connect to mongoDB
connectDB();

app.get("/", (_req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
