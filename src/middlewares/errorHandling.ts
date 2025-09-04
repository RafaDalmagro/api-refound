import { AppError } from "@/utils/AppError";
import { ZodError } from "zod";
import { ErrorRequestHandler } from "express";

export const errorHandling: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }

    if (err instanceof ZodError) {
        const issues = JSON.parse(err.message);

        return res
            .status(400)
            .json({ message: "Validation error", issues: issues[0].message });
    }

    return res.status(500).json({
        message: err.message || "Internal server error",
    });
};
