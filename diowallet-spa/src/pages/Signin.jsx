import Input from "../components/Input";
import Button from "../components/Button";
import LogoHeader from "../components/LogoHeader";
import { Link } from "react-router-dom";

export default function Signin() {
	return (
		<>
			<div className="flex flex-col items-center justify-between rounded p-8 w-[35rem] h-[35rem] bg-violet-200/25 text-2xl">
				<LogoHeader />

				<form className="flex flex-col justify-center gap-4 w-[20rem] text-xl">
					<Input type="email" placeholder="Email" />
					<Input type="password" placeholder="Password" />
					<Button type="submit" text="SIGN IN" />
				</form>
				<p className="text-white text-sm align-center">
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
