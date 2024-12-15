import express from "express";
import {Router} from "express";
import { createTourPackages, deleteTourPackage, updateTourPackage } from "../controllers/admin";

const adminRouter:Router = express.Router();

adminRouter.post("/packages",createTourPackages);
adminRouter.put('/packages/:id',updateTourPackage);
adminRouter.delete('/packages/:id',deleteTourPackage);

export default adminRouter;
