import Input from "../components/Input";
import Button from "../components/Button";
import LogoHeader from "../components/LogoHeader";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorInput from "../components/ErrorInput";
import { useNavigate } from "react-router-dom";
import { signinSchema } from "../schemas/SigninSchema.js";
import { signin } from "../services/user.js";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Signin() {
	const navigate = useNavigate();
	const [apiErrors, setApiErrors] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: zodResolver(signinSchema) });

	async function handleSubmitForm(data) {
		try {
			const token = await signin(data);
			Cookies.set("token", token.data, { expires: 1 });
			navigate("/");
		} catch (error) {
			setApiErrors(error.message);
			navigate("/signup");
		}
	}

	useEffect(() => {
		Cookies.remove("token");
	});

	return (
		<>
			<div className="flex flex-col items-center justify-between rounded p-8 w-[35rem] h-[35rem]  shadow-xl bg-violet-200/25 text-2xl">
				<LogoHeader />
				{apiErrors && <ErrorInput text={apiErrors} />}
				<form
					onSubmit={handleSubmit(handleSubmitForm)}
					className="flex flex-col justify-center gap-3 w-[20rem] text-xl"
				>
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
					<Button type="submit" text="LOGIN" id="" />
				</form>
				<p className="text-white text-sm align-center ">
					Dont have an account?{" "}
					<Link
						to="/signup"
						className="underline  text-gray-400 hover:text-gray-600"
					>
						Register now
					</Link>
					{}
				</p>
			</div>
		</>
	);
}
