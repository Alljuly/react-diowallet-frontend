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

export default function Signup() {
	const navigate = useNavigate();
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
			console.log(error.message);
		}
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
