import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticatedClient(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        return response.status(401).json({
            message: "Token missing",
        });
    }

    // Bearer sdfasdf-fasfda
        const [,token ] = authHeader.split(" ")
        try {
            const { sub } = verify(token, "123456") as IPayload;

            request.id_client = sub;

            return next();
        } catch(err) {
            return response.status(401).json({
                message: "Invalid token",
            });
        }
}