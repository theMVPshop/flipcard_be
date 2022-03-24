import "dotenv/config";
import express, { application } from "express";

import userRoutes from "./src/routes/userRoutes.js";
import flashcardRoutes from "./src/routes/flashcardRoutes.js";
import cors from "cors";
import bodyParser from "body-parser";


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
app.use("/card", flashcardRoutes);

// --------------------------for deployment------------------------------


const PORT = process.env.PORT || 8080;

app.listen(
  PORT,
  console.log(`Server running on port ${PORT}.. ${process.env.PORT}`)
);

