import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import prisma from "../utils/db";

const protectedRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token  = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as jwt.JwtPayload;

        const response = await prisma.user.findUnique({
            where: { id: decodedToken.userId },
            select: {
                email: true,
                isAdmin: true
            }
        });

        if (!response) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        
        (req as any).user = {
            email: response.email,
            isAdmin: response.isAdmin,
            userId: decodedToken.userId
        };

        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({ status: false, message: "Unauthorized" });
    }
};

const isAdminRoute = async (req: Request, res: Response, next: NextFunction) => {
    if ((req as any).user && (req as any).user.isAdmin) {
        next();
    } else {
        return res.status(403).json({ status: false, message: "Forbidden for general users, contact admin" });
    }
};

export { protectedRoute, isAdminRoute };