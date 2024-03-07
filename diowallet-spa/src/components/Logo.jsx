import Img from "../assets/payment-method-png-26062.png";
export default function Logo() {
	return (
		<div className="flex items-end justify-between text-center">
			<img src={Img} width="40" alt="logo" />
			<h1 className="font-bold text-white text-xs">DIGITAL WALLET</h1>
		</div>
	);
}
