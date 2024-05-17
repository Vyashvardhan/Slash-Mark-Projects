import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./db/db.js";
import shortenerRouter from "./routes/shortenerRouter.js";
import redirectRouter from "./routes/redirectRouter.js";

const app = express();
dotenv.config();

// Connect to the database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Morgan Logging
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

// Routes
app.use("/api", shortenerRouter);
app.use("/", redirectRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
