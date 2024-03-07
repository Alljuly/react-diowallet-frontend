import z from "zod";

export const transactionSchema = z.object({
	description: z.string().min(3, "A descrição é obrigatória"),
	value: z
		.string()
		.min(3, "O valor precisa ter no minimo 3 caracteres")
		.transform((value) => Number(value)),
});
