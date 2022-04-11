import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface JwtPayload {
  id: string
};

export default function verifyToken(req: Request, res: Response, next: NextFunction){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];
  if(!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  };
  
  try {
    const secret = process.env.SECRET as string;
    jwt.verify(token, secret);
    const { id } = jwt.decode(token, { json: true }) as JwtPayload;
    req.body.id_usuario = id;
    next();
  } catch(error) {
    return res.status(400).json({ success: false, message: "Invalid token" });
  };
};