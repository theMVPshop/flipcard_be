// import dotenv from "dotenv";

import "dotenv/config";
import express, { application } from "express";

import userRoutes from "./src/routes/userRoutes.js";
import adminRoutes from './src/routes/adminRoutes.js'
import { errorHandler, notFound } from "./src/middleware/errorMiddleware.js";
import cors from "cors";
// import path from "path";
import bodyParser from "body-parser";

// connectDB();
// const userRoutes = require('./routes/userRoutes')
// const {errorHandler, notFound} = require('./middleware/errorMiddleware')
// const cors = require('cors')
// const path = require('path')
// const bodyParder = require('body-parser')

const app = express(); // main thing
app.use(express.json()); // to accept json data
app.use(bodyParser.json()); //bodyparder middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Test that server is running
app.get("/", (req, res) => {
  res.send({ message: "Hello WWW!" });
});

app.use("/user", userRoutes);
app.use('/admin', adminRoutes) 


// --------------------------for deployment------------------------------

// Error Handling middlewares
// app.use(notFound);
// app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(
  PORT,
  console.log(`Server running on port ${PORT}.. ${process.env.PORT}`)
);

// app.listen(8080, () => {
// 	console.log("Application listening on port 8080!");
// });
