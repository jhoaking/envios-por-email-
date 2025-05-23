import { cambioContra } from "controller/cambioContraseñaController";
import { Router } from "express";

export const contraRoute = Router();

contraRoute.post("/reset-password", cambioContra);
