import { Request, Response } from "express";
import { createPackageValidation,updatePackageValidation } from "../validation/zodValidation";
import { Package } from "../db/db";

const createTourPackages = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const parsedResult = createPackageValidation.safeParse(body);
        if (!parsedResult.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed. Please check your input.",
                errors: parsedResult.error.issues,
            });
        }
        const { Title, Description, Price, AvailableDates, Image } = parsedResult.data;
        const existingPackage = await Package.findOne({ Title });
        if (existingPackage) {
            return res.status(409).json({
                success: false,
                message: `A package with the title "${Title}" already exists.`,
            });
        }
        const packageBody = await Package.create({
            Title,
            Description,
            Price,
            AvailableDates,
            Image,
        });
        return res.status(201).json({
            success: true,
            message: "Package created successfully.",
            data: packageBody,
        });
    } catch (error) {
        console.error("Error creating package:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later.",
        });
    }
};

const updateTourPackage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; 
        const body = req.body;
        const parsedResult = updatePackageValidation.safeParse(body);
        if (!parsedResult.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed. Please check your input.",
                errors: parsedResult.error.issues, 
            });
        }
        const updatedData = parsedResult.data;
        const updatedPackage = await Package.findByIdAndUpdate(
            id,
            { ...updatedData },
            { new: true } 
        );

        if (!updatedPackage) {
            return res.status(404).json({
                success: false,
                message: `Package with ID "${id}" not found.`,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Package updated successfully.",
            data: updatedPackage,
        });
    } catch (error) {
        console.error("Error updating package:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later.",
        });
    }
};


const deleteTourPackage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; 
        const deletedPackage = await Package.findByIdAndDelete(id);
        if (!deletedPackage) {
            return res.status(404).json({
                success: false,
                message: `Package with ID "${id}" not found.`,
            });
        }
        return res.status(200).json({
            success: true,
            message: "Package deleted successfully.",
            data: deletedPackage, 
        });
    } catch (error) {
        console.error("Error deleting package:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later.",
        });
    }
};

export {createTourPackages,updateTourPackage,deleteTourPackage};

