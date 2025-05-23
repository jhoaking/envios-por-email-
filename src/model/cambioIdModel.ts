import {pool} from '../db';

export const cambioId = async (userNombre : string) =>{
    const query = `SELECT usuario_id FROM usuarios_tb WHERE nombre = ?`;
    const [rows] = await pool.query(query,[userNombre]);
    return rows;
}