import { cambioContraseña } from "services/camboContraService";
import { Request, Response, NextFunction } from "express";
import { validarEmailCambioContra } from "schema/verificarEmailSchema";
import { catchAsync } from "middlewares/catchAsync";
import { sendEmailContra } from "services/emailServicesCambio";

export const cambioContra = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const vali = validarEmailCambioContra(req.body);

   
    const { token, usuario_id } = await cambioContraseña(vali.email);
    
    const link = `http://localhost:3000/reset-password?token=${token}&id=${usuario_id}`;
    await sendEmailContra(
      vali.email,
      "recuperacion de contraseña",
      `Haz clic en el siguiente enlace para restablecer tu contraseña:\n\n${link}\n\nEste enlace expirará en 30 minutos.`
    );

    res.status(201).json({
      success: "mando el link para que pueda cambiar su contraseña",
    });
  }
);
