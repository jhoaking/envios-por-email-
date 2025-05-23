import { cambioDeContra } from "model/cambioContraseñaModel";
import crypto from "crypto";
import { authModel } from "model/authModel";
import { NotFoundError } from "error/error";


export const cambioContraseña = async (email: string) => {
  const usuario = await authModel.verifyEmail(email);
  if (!usuario) {
    throw new NotFoundError("no se encontro a usuario");
  }


  const token = crypto.randomBytes(32).toString("hex");

  const expiracion = new Date(Date.now() + 30 * 60 * 1000); // epxiracion de 30 mins contando desde que se  verifica el usuario


  const data = await cambioDeContra(usuario, token, expiracion);

  return data;
};
