/* eslint-disable react/prop-types */
export default function Input({ type, label, register, name }) {
	return (
		<>
		<label>{label}</label>
		<input
			type={type}
			className="rounded-md p-2"
			{...register(name)}
		/>
		</>
	);
}
