import z from "zod";

const registerAuthSchema = z.object({
  nombre: z
    .string()
    .min(3, { message: "debes tener minimo 3 caracteres en el nombre" }),
  email: z
    .string()
    .min(1, { message: "El campo email es obligatorio" })
    .email({ message: "el email no tiene formato valido" }),
  contraseña: z
    .string()
    .min(4, { message: "La contraseña debe tener entre 4 y 12 caracteres" })
    .max(50, { message: "La contraseña debe tener entre 4 y 12 caracteres" }),
});

export type AuthType = z.infer<typeof registerAuthSchema>;

export const validateRegister = (input: unknown): AuthType => {
  const result = registerAuthSchema.safeParse(input);
  if (!result.success) {
    throw result.error;
  }
  return result.data;
};

const LoginSchema = z.object({
  email: z.string().email("Email no válido"),
  contraseña: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginType = z.infer<typeof LoginSchema>;

export const validateLogin = (input: unknown): LoginType => {
  return LoginSchema.parse(input);
};
