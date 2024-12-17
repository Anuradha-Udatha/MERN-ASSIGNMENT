import { Request, Response } from "express";
import { Package, UserBooking } from "../db/db";
import { UserBookingSchema } from "../validation/zodValidation";

const createUser = async (req:Request,res: Response) => {
    try{
        console.log("Raw request body:", req.body);
        const body=req.body;
        const parsedResult = UserBookingSchema.safeParse(body);
        if(!parsedResult.success){
            return res.status(403).json({
                success:false,
                message:"Invalid Data",
                errors:parsedResult.error.issues
            })
        }
        const {Name,Email,PhoneNumber,NumberOfTravellers,SpecialRequests,PackageId} = parsedResult.data;
        const userBody = await UserBooking.create({
            Name,
            Email,
            PhoneNumber,
            NumberOfTravellers,
            SpecialRequests,
            PackageId
        })
        return res.status(201).json({
            success:true,
            message:"Package Booked successfully",
            date:userBody
        })
    }catch(error){
        console.error("Error creating package:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later.",

    });
}
}

const getPackages = async(req:Request,res:Response) => {
    try{
        const allPackages = await Package.find()
        return res.status(200).json({
            success: true,
            data: allPackages,
        });
    }catch(error){
        console.error("Error fetching packages:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later.",
    });
    }
}

const getPackageById = async(req:Request,res:Response) =>{
    try{
        const id  = req.params.id;
        const onePackage = await Package.findById(id)
        return res.status(200).json({
            success: true,
            data: onePackage,
        });
    }catch(error){
        console.error("Error fetching a package:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later.",
    });
    }
}

export {createUser,getPackages,getPackageById}