import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";

const app = express();

app.use(bodyParser.json());

const mongoURL =
  "mongodb+srv://ruwan:ruwan123@kvaudio.rjfqoaz.mongodb.net/kva_db?appName=Kvaudio";

mongoose.connect(mongoURL);

const connection = mongoose.connection;


connection.once("open", () => {
  console.log("Mongodb Database connected Successfully");
});


app.use("/api/users", userRouter)


app.listen(3000, () => {
  console.log("Server is running port 3000");
});
