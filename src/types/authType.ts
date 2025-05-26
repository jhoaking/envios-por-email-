export interface AuthTypes {
  usuario_id: number;
  nombre: string;
  email: string;
  contraseña: string;
}

export type RegisterUserType = Omit<AuthTypes, "usuario_id">;
export type LoginUserType = Omit<AuthTypes, "usuario_id" | "nombre">;


export type ActualizarContraType = Pick<AuthTypes, "contraseña"| "usuario_id">;
