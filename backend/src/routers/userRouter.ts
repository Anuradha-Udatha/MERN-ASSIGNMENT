import express from "express";
import {Router} from "express";
import { createUser, getPackageById, getPackages } from "../controllers/user";

const userRouter:Router = express.Router();
userRouter.post('/bookings',createUser);
userRouter.get('/packages',getPackages);
userRouter.get('/packages/:id',getPackageById);

export default userRouter;