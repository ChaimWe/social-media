import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";

export default function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction){
    console.error(err);
    if (err instanceof AppError) return res.status(err.statusCode).json({message: err.message});
    res.status(500).json({
        success: false,
        message: err.message || "Internal server error"
    })
}