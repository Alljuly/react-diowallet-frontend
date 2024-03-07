import Input from "../components/Input";
import Button from "../components/Button";
import LogoHeader from "../components/LogoHeader";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signupSchema } from "../schemas/SignupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorInput from "../components/ErrorInput";
import { signup } from "../services/user";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
	const navigate = useNavigate();
	const [apiErrors, setApiErrors] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: zodResolver(signupSchema) });

	async function handleFormSubmit(data) {
		try {
			await signup(data);
			navigate("/signin");
		} catch (error) {
			setApiErrors(error.message);
		}
	}

	return (
		<>
			<div className="flex flex-col items-center justify-between  shadow-xl rounded p-8 w-[35rem] h-[35rem]  shadow-xls bg-violet-200/25 text-2xl">
				<LogoHeader />
				{apiErrors && <ErrorInput text={apiErrors} />}
				<form
					onSubmit={handleSubmit(handleFormSubmit)}
					className="flex flex-col justify-center gap-2 w-[20rem] text-xl"
				>
					<fieldset>
						<Input
							type="text"
							placeholder="Your Name"
							register={register}
							name="name"
						/>
						{errors.name && <ErrorInput text={errors.name.message} />}
					</fieldset>
					<fieldset>
						<Input
							type="email"
							placeholder="Email"
							register={register}
							name="email"
						/>
						{errors.email && <ErrorInput text={errors.email.message} />}
					</fieldset>
					<fieldset>
						<Input
							type="password"
							placeholder="Password"
							register={register}
							name="password"
						/>
						{errors.password && <ErrorInput text={errors.password.message} />}
					</fieldset>
					<fieldset>
						<Input
							type="password"
							placeholder="Confirm Password"
							register={register}
							name="confirmPassword"
						/>
						{errors.confirmPassword && (
							<ErrorInput text={errors.confirmPassword.message} />
						)}
					</fieldset>
					<Button type="submit" text="REGISTER" />
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
