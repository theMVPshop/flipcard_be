import express from "express";
// const express = require('express')
import dotenv from "dotenv";
// const dotenv = require('dotenv')
import userRoutes from "./routes/userRoutes.js";
// const userRoutes = require('./routes/userRoutes')
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
// const {errorHandler, notFound} = require('./middleware/errorMiddleware')
import cors from 'cors'
// const cors = require('cors')
import path from 'path'
// const path = require('path')
import bodyParser from 'body-parser'
// const bodyParder = require('body-parser')
dotenv.config();
// connectDB();



const app = express(); // main thing
app.use(express.json()); // to accept json data
app.use(bodyParser.json()); //bodyparder middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())

app.use("/FLIPCARD_BE/users", userRoutes);

// Test that server is running
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
		`Server running on port ${PORT}..`, 
	)
);

// app.listen(8080, () => {
// 	console.log("Application listening on port 8080!");
// });