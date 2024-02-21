import express from "express";
import { PORT, MongoDBurl } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/BookRoutes.js";
import cors from "cors";
//use express framework to create http route
const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS policy
//Option 1: Allow all origins with default of cors(*)
app.use(cors());
//Option 2: Allow custom origins
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders: ['Content-Type'],
// }))
//get is a general method to get a resource from http server
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome");
});
//middleware for books Route
app.use("/books", booksRoute);
mongoose
  .connect(MongoDBurl)
  .then(() => {
    console.log("App connected to database");
    //function for listening to this port
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
