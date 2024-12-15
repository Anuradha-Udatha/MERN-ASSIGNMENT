import express from "express";
import { Router } from "express";
import userRouter from "./userRouter";
import adminRouter from "./adminRouter";

const mainRouter:Router = express.Router();

mainRouter.use("/",userRouter);
mainRouter.use("/admin",adminRouter);

export default mainRouter