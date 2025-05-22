import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET_JWT_KEY, SALT_ROUNDS } from "config";

export const hashedPassword = async (password: string) => {
  const passwordHashed = await bcrypt.hash(password, Number(SALT_ROUNDS));
  return passwordHashed;
};

export const comparePassword = async (
  password: string,
  passwordHashed: string
) => {
  const compare = await bcrypt.compare(password, passwordHashed);
  return compare;
};

export const createToken = (user: JwtPayload): string => {
  const token = jwt.sign(
    {
      usuario_id: user.usuario_id,
      nombre: user.nombre,
      email: user.email,
    },
    SECRET_JWT_KEY,
    { expiresIn: "24h" }
  );

  return token;
};
