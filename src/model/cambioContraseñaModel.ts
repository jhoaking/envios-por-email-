import {
  CambioContraType,
  ControlContraType,
} from "types/guardarParaCambioDeContra";
import { pool } from "../db";
import { ResultSetHeader } from "mysql2";

export const cambioDeContra = async (
  data: ControlContraType
): Promise<CambioContraType> => {
  try {
    const query = `INSERT INTO tokens_tb(usuario_id ,token, expiracion) VALUES (?,?,?)`;
    const values = [data.usuario_id, data.token, data.expiracion];

    const [rows] = await pool.query<ResultSetHeader>(query, values);

    return { token_id: rows.insertId, ...data } as CambioContraType;
  } catch (error) {
    console.error("Error al insertar el token:", error);
    throw error;
  }
};
