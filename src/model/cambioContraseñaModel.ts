import {
  CambioContraType,
  ControlContraType,
} from "types/guardarParaCambioDeContra";
import { pool } from "../db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { ActualizarContraType } from "types/authType";

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

export const actualizarElCambioContra = async (
  data: ActualizarContraType
): Promise<CambioContraType> => {
  try {
    const query = `UPDATE usuarios_tb SET contraseña = ? WHERE usuario_id = ?`;
    const values = [data.contraseña, data.usuario_id];
    await pool.query<ResultSetHeader>(query, values);
    return { token_id: 0, usuario_id: data.usuario_id, token: '', expiracion: new Date() } as CambioContraType;

  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
    throw error;
  }
};

export const verificarToken = async (
  user_id: number,
  token_id: number
): Promise<CambioContraType | null> => {
  try {
    const query = `SELECT * FROM tokens_tb WHERE usuario_id = ? AND token_id = ? AND expiracion > NOW() `;
    const values = [user_id , token_id];
    const [rows] = await pool.query<RowDataPacket[]>(query,values);
    if(rows.length === 0){return null}
    return rows[0] as CambioContraType 
  } catch (error) {
   console.error("Error al obtenr la contraseña:", error);
    throw error;
  }
};

export const eliminarToken = async (token_id : number): Promise<{ message: string } | null>=>{
  const query = `DELETE FROM tokens_tb WHERE token_id = ?`;
  const [rows] = await pool.query<ResultSetHeader>(query, [token_id]);

  if(rows.affectedRows === 0){return null}
  return { message: "Se eliminóel token  con éxito" };

}
