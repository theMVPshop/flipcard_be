import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/database.js";

// require("dotenv").config();
import path from "path";

import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express(); // main thing

app.use(express.json()); // to accept json data

app.use("/FLILPCARD_BE/users", userRoutes);

// --------------------------for deployment------------------------------
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/build"))); //check with fronend team for correct name

	app.get(
		"*",
		(req, res) =>
			res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")) //check with fronend team for correct name
	);
} else {
	app.get("/", (req, res) => {
		res.send("Backend is running..");
	});
}

// --------------------------for deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`
	)
);
