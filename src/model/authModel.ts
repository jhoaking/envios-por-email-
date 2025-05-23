import { AuthType } from "schema/authSchema";
import { pool } from "../db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { AuthTypes } from "types/authType";
import { hashedPassword } from "utils/authUtil";

export class authModel {
  static registrarUser = async (data: AuthType): Promise<AuthTypes> => {
    try {
      const query = `INSERT INTO usuarios_tb(nombre,email,contraseña)VALUES(?,?,?)`;

      const hashedPasswordd = await hashedPassword(data.contraseña);

      const values = [data.nombre, data.email, hashedPasswordd];

      const [result] = await pool.query<ResultSetHeader>(query, values);

      const insertedId = result.insertId;

      const user = await this.userById(insertedId);

      return user;
    } catch (error) {
      console.error("Error en registrarUser:", error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error en la DB al registrar");
    }
  };

  static verifyEmail = async (
    email: string
  ) => {
    try {
      const query = `SELECT * FROM usuarios_tb WHERE email = ?`;
      const [rows] = await pool.query<RowDataPacket[]>(query, [email]);
      if (rows.length === 0) return null;

      return rows[0] ;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error en la DB al verificar el email");
    }
  };

  static userById = async (user_id: number): Promise<AuthTypes> => {
    try {
      const query = "SELECT * FROM usuarios_tb WHERE usuario_id = ?";
      const [rows] = await pool.query<RowDataPacket[]>(query, [user_id]);
      return rows[0] as AuthTypes;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error en la DB al obtener el usuario");
    }
  };
}
