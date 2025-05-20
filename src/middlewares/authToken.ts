import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_JWT_KEY } from "config";
import { AuthTypes } from "types/authType";

interface AuthenticatedRequest extends Request {
  user?: AuthTypes;
}
export const verifyUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      res
        .status(401)
        .json({ message: "No autorizado: Token no proporcionado" });
    }
    const decoded = (await jwt.verify(token, SECRET_JWT_KEY)) as AuthTypes;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};
