import Input from "../components/Input";
import Button from "../components/Button";
import LogoHeader from "../components/LogoHeader";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorInput from "../components/ErrorInput";

const signupSchema = z
	.object({
		name: z
			.string()
			.min(3, "O nome precisa ter no minimo 3 caracteres")
			.transform((name) => {
				return name
					.trim()
					.split("")
					.map((word) => {
						return word[0].toUpperCase().concat(word.substring());
					});
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

export default function Signup() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: zodResolver(signupSchema) });

	function handleFormSubmit(data) {
		console.log(data);
	}

	return (
		<>
			<div className="flex flex-col items-center justify-between rounded p-8 w-[35rem] h-[35rem] bg-violet-200/25 text-2xl">
				<LogoHeader />
				<form
					onSubmit={handleSubmit(handleFormSubmit)}
					className="flex flex-col justify-center gap-2 w-[20rem] text-xl"
				>
					<div>
						<Input
							type="text"
							placeholder="Your Name"
							register={register}
							name="name"
						/>
						{errors.name && <ErrorInput text={errors.name.message} />}
					</div>
					<div>
						<Input
							type="email"
							placeholder="Email"
							register={register}
							name="email"
						/>
						{errors.email && <ErrorInput text={errors.email.message} />}
					</div>
					<div>
						<Input
							type="password"
							placeholder="Password"
							register={register}
							name="password"
						/>
						{errors.password && <ErrorInput text={errors.password.message} />}
					</div>
					<div>
						<Input
							type="password"
							placeholder="Confirm Password"
							register={register}
							name="confirmPassword"
						/>
						{errors.confirmPassword && (
							<ErrorInput text={errors.confirmPassword.message} />
						)}
					</div>
					<Button type="submit" text="LOGIN" />	
				</form>
				<p className="text-white text-sm align-center">
					Already have an account?{" "}
					<Link
						to="/signin"
						className="underline text-gray-400 hover:text-gray-600"
					>
						Log in!
					</Link>
				</p>
			</div>
		</>
	);
}
