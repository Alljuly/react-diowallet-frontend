import Input from "../components/Input";
import Button from "../components/Button";
import LogoHeader from "../components/LogoHeader";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
export default function Signup() {
	return (
		<>
			<div className="flex flex-col items-center justify-between rounded p-8 w-[35rem] h-[35rem] bg-violet-200/25 text-2xl">
				<Link to="/signin">
					<BsArrowLeft className="text-white absolute top-3 left-3 text-2xl" />
				</Link>
				<LogoHeader />
				<form className="flex flex-col justify-center gap-4 w-[20rem] text-xl">
					<Input type="text" placeholder="Your Name" />
					<Input type="email" placeholder="Email" />
					<Input type="password" placeholder="Password" />
					<Input type="password" placeholder="Confirm Password" />
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
					{}
				</p>
			</div>
		</>
	);
}
