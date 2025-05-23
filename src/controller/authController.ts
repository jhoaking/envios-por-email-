import { Request, Response, NextFunction, CookieOptions } from "express";
import { catchAsync } from "middlewares/catchAsync";
import { validateLogin, validateRegister } from "schema/authSchema";
import { authService } from "services/authService";
import { AuthTypes } from "types/authType";
import { sendEmail } from "services/emailServices";

export class authController {
  static register = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const vali = validateRegister(req.body);

      const user = await authService.registerUser(vali);
      await sendEmail(user.email, user.nombre);

      res.status(201).json({
        message: "usuario registrado con exito",
        bienvenida: `Bienvenido ${user.nombre}!!`,
      });
    }
  );

  static login = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const vali = validateLogin(req.body);

      const token = await authService.loginUser(vali.email, vali.contraseña);

      const options: CookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      };
      res
        .status(201)
        .cookie("access_token", token, options)
        .json({
          message: "El usuario inició sesión con éxito!",
          bienvenida: `Bienvenido!! ${vali.email}`,
          token : token
        });
    }
  );

  static logoutUser = (_req: Request, res: Response) => {
    try {
      res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      res.status(200).send({ message: "Sesión cerrada correctamente" });
    } catch (error) {
      res.status(500).send({ error: "Error al cerrar sesión" });
    }
  };

  static protectedUser = (req: Request, res: Response) => {
    const user = req.user as AuthTypes;
    if (!user) {
      res.json({ message: "Usted no esta Autorizado para ingresar" });
      return;
    }

    res.status(200).json({ message: "Usuario autorizado", user });
    return;
  };
}
