import z from "zod";

const validarEmailParaContra = z.object({
  email: z
    .string()
    .min(1, { message: "El campo email es obligatorio" })
    .email({ message: "el email debe estar en formato valido" }),
});
export type EmailCambioType = z.infer<typeof validarEmailParaContra>;

export const validarEmailCambioContra = (
  input: unknown
): EmailCambioType => {
 
  return validarEmailParaContra.parse(input);
};
