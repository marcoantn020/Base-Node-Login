import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

export default async (request: Request, response: Response, next: any) => {
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
        return response.status(401).json({ error: `User not authorized!` });
    }

    const [, token] = authorizationHeader.split(" ");


    try {
        verify(token, '0cb3d05e8b338bb9113a1a05b2470790')
        return next();
    } catch (error) {
        return response.json({ error: "Token jwt invalid!" })
    }

}