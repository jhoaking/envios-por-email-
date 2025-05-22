import request from "supertest";
import { app } from "../src/app";

describe("AUTH", () => {
  const user = {
    nombre: "test" + Date.now(),
    email: "test" + Date.now() + "@gmail.com",
    contraseña: "123456",
  };

  describe("POST/register", () => {
    test("deberia mandar 201 si se registro con exito el usuario", async () => {
      const res = await request(app).post("/user/register").send(user);
      expect(res.status).toBe(201);
    });
  });

  describe("POST /register", () => {
    test("espera un 400 si el usuario ya se registro e intenta registrarse", async () => {
      await request(app).post("/user/register").send(user);
      const res = await request(app).post("/user/register").send(user);
      expect(res.body.message).toBe("ya hay un email registrado");
      expect(res.status).toBe(400);
    });
  });

  describe("POST /register", () => {
    test("deberia mandar un 400 si el formato del email esta mal ", async () => {
      const res = await request(app).post("/user/register").send({
        nombre: user.nombre,
        email: "hola123",
        contraseña: user.contraseña,
      });
      expect(res.body.message).toBe("el email no tiene formato valido");
      expect(res.status).toBe(400);
    });
  });
});