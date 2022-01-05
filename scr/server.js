import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/database.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

app.listen(8080, () => {
	console.log("Application listening on port 8080!");
});

const app = express(); // main thing
app.use(express.json()); // to accept json data
app.use("/FLILPCARD_BE/users", userRoutes);

//Test that server is running
app.get("/", (req, res) => {
	res.send({ message: "Hello WWW!" });
	console.log("server is running");
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
