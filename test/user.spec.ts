import request from "supertest";
import { app } from "../src/app";
import { SECRET_JWT_KEY } from "config";
import jwt from "jsonwebtoken";

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

  describe("POST /login", () => {
    test("deberia mandar un 201 si el usuario se logeo con exito", async () => {
      const res = await request(app).post("/user/login").send(user);
      expect(res.status).toBe(201);
    });
  });

  describe("POST /login", () => {
    test("deberia mandar un 400 si la contraseña es incorrecta", async () => {
      const res = await request(app)
        .post("/user/login")
        .send({ email: user.email, contraseña: "hola" });
      expect(res.status).toBe(400);
    });
  });

  describe("POST  /login", () => {
    test("espera un 400 si no se pone los datos necesarios", async () => {
      // va a funcinar para el email igual
      const res = await request(app)
        .post("/user/login")
        .send({ contraseña: user.contraseña });
      expect(res.status).toBe(400);
    });
  });

  describe("POST /login", () => {
    test("deberia mandar un 201 si el token se creo correctamente al usuario", async () => {
      const res = await request(app).post("/user/login").send(user);
      expect(res.status).toBe(201);
      expect(res.body.token).toBeDefined();

      const decoded = jwt.verify(res.body.token, SECRET_JWT_KEY);

      expect(decoded).toHaveProperty("usuario_id");
      expect(decoded).toHaveProperty("email", user.email);
    });
  });

   describe("GET /protected", () => {
    test("deberia mandar un 200 si se pudo acceder a la ruta protegida", async () => {
      const loginUser =await request(app).post("/user/login").send(user);

      const cookie = loginUser.headers["set-cookie"];

      const res = await request(app).get("/user/protected").set("cookie",cookie);
      expect(res.status).toBe(200)
     
    });
  });

  describe("GET /logout", () => {
    test("deberia mandar un 200 si la sesion se cerro con exito", async () => {
      const res = await request(app).get("/user/logout").send(user);
      expect(res.status).toBe(200);
    });
  });

 
});
