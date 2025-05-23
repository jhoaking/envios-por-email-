import z from "zod";

const validarEmailParaContra = z.object({
  email: z
    .string()
    .min(1, { message: "El campo email es obligatorio" })
    .email({ message: "el email debe estar en formato valido" }),
});

export const validarEmailCambioContra = (input: unknown) => {
  return validarEmailParaContra.safeParse(input);
};
