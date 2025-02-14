import { NextFunction, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";

type Method = "GET" | "POST" | "PUT" | "DELETE"

export interface IExcludedPaths {
    path : string,
    method : Method
}

export const createToken = (payload : any) => {
    const {JWT_SECRET} = process.env;
    const token = sign(payload , JWT_SECRET || '');
    return token;
}

export const verifyToken = (token : string) => {
    const {JWT_SECRET} = process.env;
    const payload = verify(token , JWT_SECRET || '')
    return payload;
}

export const authorize = (excludedPaths : IExcludedPaths[]) => {
    return (req : Request, res : Response , next : NextFunction) => {
        try {
            if(excludedPaths.find((e) => e.path === req.url && e.method === req.method))
                return next();

            const token = req.headers.authorization?.split(" ")[1] || "";
            const payload = verifyToken(token)

            res.locals.user = payload;
            next();

        } catch (error) {
            next({statusCode : 403 , message : "UNAUTHORIZED"})
        }
    }
}


export const permit = (permittedRoles : string[]) => {
    return (req : Request , res : Response , next : NextFunction) => {
        if(permittedRoles.includes(res.locals.user.role)) {
            return next();
        }
        next({statusCode : 403 ,  message : "UNAUTHORIZED"});
    }
}