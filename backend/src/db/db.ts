import mongoose, { Document, Schema } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const url = process.env.MONGO_URL; 
        if (!url) {
            throw new Error("MONGO_URL is not defined in environment variables");
        }
        await mongoose.connect(url);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); 
    }
};

connectDB();

export interface IPackage extends Document {
    Title: string;
    Description: string;
    Price: number;
    AvailableDates: Date[];
    Image: string;
}

export interface IUserPackage extends Document {
    Name: string;
    Email: string;
    PhoneNumber: string;
    NumberOfTravellers: number;
    SpecialRequests?: string[];
    PackageId: mongoose.Types.ObjectId; 
}


const packageSchema: Schema = new Schema<IPackage>(
    {
        Title: {
            type: String,
            required: [true, "Title is required"],
            minlength: [5, "Title must be at least 5 characters long"],
            maxlength: [100, "Title cannot exceed 100 characters"],
            trim: true,
        },
        Description: {
            type: String,
            required: [true, "Description is required"],
            minlength: [10, "Description must be at least 10 characters long"],
            maxlength: [1000, "Description cannot exceed 1000 characters"],
        },
        Price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price cannot be negative"],
        },
        AvailableDates: {
            type: [Date],
            validate: {
                validator: function (dates: Date[]) {
                    return dates.every((date) => date > new Date());
                },
                message: "Available dates must be in the future",
            },
        },
        Image: {
            type: String,
            required: [true, "Image URL is required"],
            validate: {
                validator: function (v: string) {
                    return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(v);
                },
                message: "Invalid image URL",
            },
        },
    },
);


const userBookingSchema: Schema = new Schema<IUserPackage>(
    {
        Name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        Email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            match: [/.+@.+\..+/, "Please enter a valid email"],
        },
        PhoneNumber: {
            type: String,
            required: [true, "Phone Number is required"],
            trim: true,
            match: [/^\d{10}$/, "Please enter a valid phone number"], 
        },
        NumberOfTravellers: {
            type: Number,
            required: [true, "Number of Travellers is required"],
            min: [1, "At least one traveller is required"],
        },
        SpecialRequests: {
            type: [String],
            default: [],
        },
        PackageId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Package",
            required: true,
        },
    },
);


const Package = mongoose.model<IPackage>("Package", packageSchema);
const UserBooking = mongoose.model<IUserPackage>("UserBooking", userBookingSchema);


export { Package, UserBooking };
