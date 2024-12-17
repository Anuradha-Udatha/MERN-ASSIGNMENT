import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { UserBooking } from "../db/db";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

declare module "express-serve-static-core" {
    interface Request {
        user?: any; 
    }
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(403).json({
                success: false,
                message: "No token provided or invalid format",
            });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(403).json({
                success: false,
                message: "Token is invalid or expired",
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        if (!decoded || !decoded.id) {
            return res.status(403).json({
                success: false,
                message: "Invalid or unmatched token",
            });
        }

        const user = await UserBooking.findById(decoded.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication middleware error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export default authMiddleware;
