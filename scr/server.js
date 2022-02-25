import dotenv from "dotenv";
dotenv.config();
import express from "express";

import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cors from 'cors'
import path from 'path'
import bodyParser from 'body-parser'

// connectDB();
// const userRoutes = require('./routes/userRoutes')
// const {errorHandler, notFound} = require('./middleware/errorMiddleware')
// const cors = require('cors')
// const path = require('path')
// const bodyParder = require('body-parser')



const app = express(); // main thing
app.use(express.json()); // to accept json data
app.use(bodyParser.json()); //bodyparder middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())


app.use("/user", userRoutes);

// Test that server is running
app.get("/", (req, res) => {
	res.send({ message: "Hello WWW!" });
});

// --------------------------for deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(
	PORT,
	console.log(
		`Server running on port ${PORT}.. ${process.env.PORT}`, 
	)
);

// app.listen(8080, () => {
// 	console.log("Application listening on port 8080!");
// });