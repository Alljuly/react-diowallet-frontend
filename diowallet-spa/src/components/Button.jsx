/* eslint-disable react/prop-types */
export default function Button(props) {
	return (
		<button
			type={props.type}
			className="px-4 py-2 rounded-md w-full font-bold text-white text-2xl"
		>
			{props.text}
		</button>
	);
}
