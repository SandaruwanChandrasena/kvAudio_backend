import express from "express";
import { registerUser } from "../controllers/userContoller.js";

const userRouter = express.Router();

userRouter.post("/", registerUser);

export default userRouter;