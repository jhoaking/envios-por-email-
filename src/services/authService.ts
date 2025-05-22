import { authModel } from "model/authModel";
import { JwtPayload } from "jsonwebtoken";
import { createToken, comparePassword } from "utils/authUtil";
import { RegisterUserType } from "types/authType";
import { BadRequestError, NotFoundError } from "error/error";


export class authService {
  static loginUser = async (
    email: string,
    contraseña: string
  ): Promise<string> => {
    const user = await authModel.verifyEmail(email);
    if (!user) {
      throw new NotFoundError("email no encontrado");
    }

    const passwordValid = await comparePassword(contraseña, user.contraseña);
    if (!passwordValid) {
      throw new Error("Contraseña incorrecta");
    }
    const payload: JwtPayload = {
      usuario_id: user.usuario_id,
      nombre: user.nombre,
      email: user.email,
    };

    const token = createToken(payload);
    return token;
  };

  static registerUser = async (validateData: RegisterUserType) => {
    const email = await authModel.verifyEmail(validateData.email);
    if (email) {
      throw new BadRequestError("ya hay un email registrado");
    }
    const newUser = await authModel.registrarUser(validateData);
    return newUser;
  };
}
