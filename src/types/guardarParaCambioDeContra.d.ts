export interface CambioContraType {
  token_id: number;
  usuario_id: number;
  token: string;
  expiracion: Date;
}

export type ControlContraType = Omit<CambioContraType , "token_id">

