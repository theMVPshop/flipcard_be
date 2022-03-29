import "dotenv/config"
import express, { json } from "express"
import cors from "cors"

import userRoutes from "./src/routes/userRoutes.js"
import flashcardRoutes from "./src/routes/flashcardRoutes.js"
import cardSetRoutes from "./src/routes/cardSetRoutes.js"
import globalErrorHandler from "./src/controllers/errorController.js"

const app = express() // create an instance of express
app.use(json()) // to accept json data
app.use(cors()) // to accept requests from other domains

// Test that server is running
app.get("/", (req, res) => res.send({ message: "Flipcardz express.js DB" }))

app.use("/user", userRoutes)
app.use("/card", flashcardRoutes)
app.use("/cardset", cardSetRoutes)

app.use(globalErrorHandler)

// --------------------------for deployment------------------------------

const PORT = process.env.PORT || 8080

app.listen(PORT, console.log(`Server running on port ${PORT}.. `))
