export default function Singin() {
	return (
		<>
			<div className="flex flex-col items-center justify-around rounded p-8 w-[35rem] h-[35rem]">
				<h1 className="font-bold text-white">WALLET</h1>
				<form className="flex flex-col justify-center gap-4 w-full text-2xl">
					<input
						type="email"
						placeholder="Email"
						className="roudend p-2 w-full"
					/>
					<input
						type="password"
						placeholder="Password"
						className="roudend p-2 w-full"
					/>
					<button
						type="submit"
						className="px-4 py-2 rounded w-full font-bold text-white text-2xl"
					>
						SIGN IN
					</button>
				</form>
			</div>
		</>
	);
}
