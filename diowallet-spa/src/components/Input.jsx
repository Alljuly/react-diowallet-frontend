/* eslint-disable react/prop-types */
export default function Input(props) {
	const type = props.type;
	const placeholder = props.placeholder;

	return (
		<input
			type={type}
			placeholder={placeholder}
			className="rounded-md p-2 w-full"
		/>
	);
}
