import request from "supertest";
import { app } from "../src/app";
import { sendEmailContra } from "services/emailServicesCambio";

jest.mock("../src/model/authModel", () => ({
  authModel: {
    verifyEmail: jest.fn().mockResolvedValue({
      usuario_id: 1,
      nombre: "Pedro",
      email: "peredoroj@gmail.com",
    }),
  },
}));

jest.mock("../src/services/camboContraService", () => ({
  cambioContraseña: jest.fn().mockResolvedValue({
    token: "fake-token",
    usuario_id: 1,
  }),
}));

jest.mock("../src/services/emailServicesCambio", () => ({
  sendEmailContra: jest.fn().mockResolvedValue(undefined),
}));

describe("CAMBIO CONTRA", () => {
  const user = { email: "peredoroj@gmail.com" };

  describe("POST  /reset-password", () => {
    test("deberia mandar un 201 si el email es el correcto", async () => {
      const res = await request(app).post("/reset-password").send(user);
      expect(res.status).toBe(201);
      expect(sendEmailContra).toHaveBeenCalled();
    });
  });
});
