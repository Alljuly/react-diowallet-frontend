/* eslint-disable react-hooks/exhaustive-deps */
import Button from "../components/Button";
import Logo from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { GoSignOut } from "react-icons/go";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { userLogged } from "../services/user";
import { findAllTransactions } from "../services/transaction";
import ErrorInput from "../components/ErrorInput";

export default function Home() {
	const navigate = useNavigate();
	const [user, setUser] = useState({});
	const [transactions, setTransactions] = useState([]);
	const [balance, setBalance] = useState(0);
	const [apiErrors, setApiErrors] = useState("");

	function validateToken() {
		const token = Cookies.get("token");
		console.log(token);
		if (!token) {
			navigate("/auth");
		}
	}

	async function getUserLogged() {
		try {
			const userResponse = await userLogged();
			setUser(userResponse.data);
		} catch (error) {
			setApiErrors(error.message);
		}
	}

	function calculateBalance(transactions) {
		let total = 0;
		transactions.forEach((t) => {
			t.type == "input"
				? (total += Number(t.value))
				: (total -= Number(t.value));
		});
		setBalance(total);
	}

	useEffect(() => {
		validateToken();
		getUserLogged();
		getAllTransactions();
	}, [transactions]);

	async function getAllTransactions() {
		try {
			const response = await findAllTransactions();
			setTransactions(response.data);
			calculateBalance(transactions);
		} catch (error) {
			console.log(error);
		}
	}

	function formatDate(dateString) {
		const date = new Date(dateString);
		const day = date.getDate().toString().padStart(2, "0");
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	}

	function formateValue(value) {
		const newValue = value.toFixed(2);
		return newValue;
	}

	return (
		<div className="flex flex-col items-center justify-between rounded p-8 w-[50rem] h-[35rem]  shadow-xl bg-violet-200/25 text-2xl">
			{apiErrors && <ErrorInput text={apiErrors} />}
			<div className="flex flex-row justify-between w-full">
				<Logo />
				<div className="flex flex-row justify-end w-full items-center text-center">
					<h1 className="m-1 first-letter:uppercase lowercase  text-blue-900">
						Olá, {user.name}
					</h1>
					<Link to="/signin">
						<GoSignOut />
					</Link>
				</div>
			</div>

			<div className=" h-full w-full bg-slate-100/30 shadow-xl rounded-s m-8  text-blue-900">
				<div className="flex flex-col justify-between">
					<div className="flex flex-row w-full justify-between border border-secondary ">
						<div className="w-full ml-4 ">Historico</div>
						<div className="w-full ml-4 text-center">R$</div>
					</div>

					<div className="flex flex-col">
						<div className="h-[17rem] overflow-y-scroll custom-scrollbar">
							{transactions.length ? (
								transactions.map((transaction) => (
									<div
										key={transaction.handle}
										className="flex flex-row w-full justify-center border text-center"
									>
										<div className="flex justicy-center mx-5 text-sm text-center items-center text-gray-400 font-medium w-[25%]">
											{formatDate(transaction.createdAt)}
										</div>
										<div className="w-full text-left">
											{transaction.description}
										</div>
										<div
											className={`w-full ${
												transaction.type == "input"
													? "text-blue-600"
													: "text-red-700"
											} text-right mx-5 `}
										>
											{formateValue(transaction.value)}
										</div>
									</div>
								))
							) : (
								<p className="text-sm text-center text-gray-400">
									There is no transactions yet.
								</p>
							)}
						</div>
					</div>
					<div className="flex justify-between mx-5">
						<p>Balance:</p>{" "}
						<p className={`${balance >= 0 ? "text-blue-600" : "text-red-700"}`}>
							{`R$ ${formateValue(balance)}`}
						</p>
					</div>
				</div>
			</div>

			<div className="flex flex-row items-center justify-evenly w-full">
				<div>
					<Button
						type="button"
						id=" "
						text="New Input"
						className=""
						transaction="input"
					/>
				</div>
				<div>
					<Button
						type="button"
						id=" "
						text="New Output"
						className=""
						transaction="output"
					/>
				</div>
			</div>
		</div>
	);
}
