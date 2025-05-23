import { cambioDeContra } from "model/cambioContraseñaModel";
import crypto from "crypto";
import { authModel } from "model/authModel";
import { NotFoundError } from "error/error";
import { ControlContraType } from "types/guardarParaCambioDeContra";


export const cambioContraseña = async (email: string) => {
  const user = await authModel.verifyEmail(email);
  if (!user) {
    throw new NotFoundError("no se encontro a usuario");
  }
  const token = crypto.randomBytes(32).toString("hex");
  const expiracion = new Date(Date.now() + 30 * 60 * 1000); // epxiracion de 30 mins contando desde que se  verifica el usuario

   const data = await cambioDeContra({usuario_id: user.usuario_id , token,expiracion} as ControlContraType);

  return data;
};
