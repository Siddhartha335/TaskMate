import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

const routeNotFound = (req:Request, res:Response, next:NextFunction) => {
    const error = new Error(`Route Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errorHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if (err instanceof Prisma.PrismaClientValidationError) {
        statusCode = 400;
        message = 'Prisma validation error';
    }

    if (err instanceof Prisma.PrismaClientUnknownRequestError) {
        statusCode = 500;
        message = 'Unknown error occurred with Prisma';
    }

    if (err.name === "CastError") {
        statusCode = 404;
        message = "Resource not found";
    }

    res.status(statusCode).json({
        message:message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    });
}

export { routeNotFound, errorHandler }