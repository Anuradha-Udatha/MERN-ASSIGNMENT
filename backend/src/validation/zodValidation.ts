import { z } from "zod";

const packageBaseValidation = z.object({
    Title: z.string()
        .min(5, "Title must be at least 5 characters long")
        .max(100, "Title cannot exceed 100 characters"),
    Description: z.string()
        .min(10, "Description must be at least 10 characters long")
        .max(1000, "Description cannot exceed 1000 characters"),
    Price: z.number()
        .positive("Price must be a positive number")
        .max(1000000, "Price cannot exceed 1,000,000"),
    AvailableDates: z.array(
        z.preprocess((val) => (typeof val === "string" ? new Date(val) : val), z.date())
    ).refine(
        (dates) => dates.every((date) => date > new Date()),
        "All available dates must be in the future"
    ),
    Image: z.string().url("Invalid URL format for Image"),
});


const createPackageValidation = packageBaseValidation;
const updatePackageValidation = packageBaseValidation.partial(); 


const UserBookingSchema = z.object({
    Name: z.string()
        .min(1, "Name is required")
        .max(100, "Name cannot exceed 100 characters"),
    Email: z.string()
        .email("Invalid email address")
        .max(100, "Email cannot exceed 100 characters"),
    PhoneNumber: z.string()
        .regex(/^\d{10}$/, "Phone Number must be exactly 10 digits"),
    NumberOfTravellers: z.number()
        .positive("Number of Travellers must be a positive number")
        .max(100, "Number of Travellers cannot exceed 100"),
    SpecialRequests: z.array(z.string())
        .default([]),
    PackageId: z.string()
        .regex(/^[a-fA-F0-9]{24}$/, "Invalid PackageId format (must be a valid MongoDB ObjectId)")
        .nonempty("PackageId is required"), 
});


export { createPackageValidation, updatePackageValidation, UserBookingSchema };
