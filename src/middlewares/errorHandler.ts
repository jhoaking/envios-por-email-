import {ErrorRequestHandler, Request ,Response , NextFunction} from "express";
import { ZodError } from "zod";
import { AppError } from "./appError";



export const errorHandler: ErrorRequestHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
     res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
    return
  }

   if (err instanceof ZodError) {
    const mensaje = err.errors[0]?.message || "Error de validación";
     res.status(400).json({
      status: "error",
      message: mensaje,
    });
    return
  }
};