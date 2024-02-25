import z from "zod";
export const signupSchema = z
	.object({
		name: z
			.string()
			.min(3, "O nome precisa ter no minimo 3 caracteres")
			.transform((name) => {
				return name
					.trim()
					.split("")
					.map((word) => {
						return word[0].toUpperCase().concat(word.substring(1));
					})
					.join(" ");
			}),
		email: z.string().nonempty("O email é obrigatório").email().toLowerCase(),
		password: z.string().min(8, "A senha precisa ter no minímo 8 caracteres"),
		confirmPassword: z
			.string()
			.min(8, "A senha precisa ter no minímo 8 caracteres"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "As senhas não correspondem",
		path: ["confirmPassword"],
	});
