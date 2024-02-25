import z from "zod";

export const signinSchema = z.object({
	email: z.string().nonempty("O email é obrigatório").email().toLowerCase(),
	password: z.string().min(8),
});
