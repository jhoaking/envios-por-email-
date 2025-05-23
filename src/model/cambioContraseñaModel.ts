import { CambioContraType } from "types/guardarParaCambioDeContra";
import { pool } from "../db";
import { ResultSetHeader } from "mysql2";
import { cambioId } from "model/cambioIdModel";

export const cambioDeContra = async (
  user: string,
  token: string,
  expiracion: string
): Promise<CambioContraType> => {
  const usuario_id = await cambioId(user);
  const query = `INSERT INTO tokens_tb(usuario_id ,token, expiracion) VALUES (?,?,?)`;
  const values = [usuario_id, token, expiracion];

  const [rows] = await pool.query<ResultSetHeader>(query, values);
  return {
    token_id: rows.insertId,
    usuario_id,
    token,
    expiracion,
  } as CambioContraType;
};
