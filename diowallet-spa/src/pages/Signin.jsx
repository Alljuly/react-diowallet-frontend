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

	

	return (
		<>
			<div className="flex flex-col items-center justify-between rounded p-8 w-[35rem] h-[35rem]  shadow-xl bg-white text-2xl">
				<LogoHeader />
				{apiErrors && <ErrorInput text={apiErrors} />}
			
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
