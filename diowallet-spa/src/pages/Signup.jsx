import Input from "../components/Input";
import Button from "../components/Button";
import LogoHeader from "../components/LogoHeader";
export default function Singin() {
	return (
		<>
			<div className="flex flex-col items-center justify-around rounded p-8 w-[25rem] h-[40rem]">
				<LogoHeader />

				<form className="flex flex-col justify-center gap-4 w-full text-xl">
					<Input type="text" placeholder="Your Name" />
					<Input type="email" placeholder="Email" />
					<Input type="password" placeholder="Password" />
					<Input type="password" placeholder="Confirm Password" />
					<Button type="submit" text="REGISTER" />
				</form>
			</div>
		</>
	);
}
