import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express(); // main thing

app.use(express.json()); // to accept json data

// import { errorHandler, notFound } from "./middleware/errorMiddleware.js"; **finalizing middlewear for users and error handling

dotenv.config();

// connectDB(); ** Will use for when I get DB credentials

app.use("/FLIPCARD_BE/users", userRoutes);
