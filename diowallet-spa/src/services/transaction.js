import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:5000";

export async function findAllTransactions() {
	const response = await axios.get(`${BASE_URL}/transactions`, {
		headers: { Authorization: `Bearer ${Cookies.get("token")}` },
	});
	return response;
}

export async function create(body) {
	const response = await axios.post(`${BASE_URL}/transactions`, body, {
		headers: { Authorization: `Bearer ${Cookies.get("token")}` },
	});

	console.log("aopa", response);
	return response;
}
