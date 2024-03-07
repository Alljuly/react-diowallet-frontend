import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
//import { create } from "../services/transaction";
import ErrorInput from "../components/ErrorInput";
import { transactionSchema } from "../schemas/TransactionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { create } from "../services/transaction";

export default function NewTransactions() {
	const { type } = useParams();
	const navigate = useNavigate();
	const [apiErrors, setApiErros] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: zodResolver(transactionSchema) });

	function validateToken() {
		const token = Cookies.get("token");
		if (!token) {
			navigate("/signin");
		}
	}

	async function onSubmitForm(data) {
		try {
			const body = { ...data, type };
			await create(body);
			navigate("/");
		} catch (error) {
			setApiErros(error.message);
		}
	}
	useEffect(() => {
		validateToken();
	});

	return (
		<>
			<div className="flex flex-col items-center justify-evenly shadow-xl min-h-[25rem] min-w-[400px] max-w-[400px] rounded p-8  bg-violet-200/25 text-2xl gap-2">
				<div className="flex flex-col w-full justify-left gap-3 text-white font-bold">
					<Link to="/">
						<CiLogout />
					</Link>

					<p>New {type}</p>
				</div>
				{apiErrors && <ErrorInput text={apiErrors} />}
				<form
					className="flex flex-col gap-4 w-full "
					action=""
					onSubmit={handleSubmit(onSubmitForm)}
				>
					<div>
						<Input
							type="text"
							register={register}
							placeholder="description"
							name="description"
						/>
						{errors.description && (
							<ErrorInput text={errors.description.message} />
						)}
					</div>

					<div>
						<Input
							type="number"
							register={register}
							placeholder="0,00"
							name="value"
						/>
						{errors.value && <ErrorInput text={errors.value.message} />}
					</div>
					<Button type="submit" transaction={type} text="Confirm" />
				</form>
			</div>
		</>
	);
}
