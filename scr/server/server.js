import express from "express";
import dotenv from "dotenv";
import connectDB from "../database/database.js";
import path from "path";
import userRoutes from "../routes/userRoutes.js";
import { errorHandler, notFound } from "../middleware/errorMiddleware.js";

require("dotenv").config();

dotenv.config();
connectDB();

const app = express(); // main thing
app.use(express.json()); // to accept json data
app.use("/FLILPCARD_BE/users", userRoutes);

//Test that server is running
app.get("/", (req, res) => {
	res.send({ message: "Hello WWW!" });
	console.log("server is running");
});

app.listen(8080, () => {
	console.log("Application listening on port 8080!");
});

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
