/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

export default function Button(props) {
	const navigate = useNavigate();

	return (
		<button
			type={props.type}
			className={`${
				props.className
					? props.className
					: "px-4 py-2 rounded-md w-full font-bold text-white text-2xl"
			}`}
			id={`${props.id ? props.id : "submitButton"}`}
			onClick={() =>
				props.transaction && navigate(`/transaction/${props.transaction}`)
			}
		>
			{props.text}
		</button>
	);
}
