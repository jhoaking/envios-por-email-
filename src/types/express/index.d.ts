import { AuthTypes } from "types/authType";

export {};

declare global {
  namespace Express {
    interface Request {
      user?: AuthTypes;
    }
  }
}