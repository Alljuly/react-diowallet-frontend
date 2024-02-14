//	import Singin from "./Signin";
import Singup from "./Signup";

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-center bg-violet-200/25 rounded p-8 w-[35rem] h-[35rem] text-2xl">
			<Singup />
		</main>
	);
}
