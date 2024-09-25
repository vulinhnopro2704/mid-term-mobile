import { BACKEND_URL } from "./const_type";

export const apiRequest = {
	async request(
		method: string,
		endpoint: string,
		params?: Record<string, string>,
		body?: any
	) {
		// Construct URL with query parameters
		let url = new URL(`${BACKEND_URL}${endpoint}`);
		if (params) {
			Object.keys(params).forEach((key) =>
				url.searchParams.append(key, params[key])
			);
		}

		// Set up fetch options
		const options: RequestInit = {
			method: method,
			headers: {
				"Content-Type": "application/json",
			},
		};

		if (body) {
			options.body = JSON.stringify(body);
		}

		// Execute fetch request
		const response = await fetch(url.toString(), options);

		// Check if the response body is empty
		const text = await response.text();
		const responseData = text ? JSON.parse(text) : {};

		// Return different responses based on the method
		if (method === "GET") {
			return responseData;
		} else {
			return {
				data: responseData || {},
				status: response.status,
				message: responseData.message || "",
			};
		}
	},

	get(endpoint: string, params?: Record<string, string>) {
		return this.request("GET", endpoint, params);
	},

	post(endpoint: string, body?: any) {
		return this.request("POST", endpoint, undefined, body);
	},

	put(endpoint: string, body?: any) {
		return this.request("PUT", endpoint, undefined, body);
	},

	delete(endpoint: string, params?: Record<string, string>) {
		return this.request("DELETE", endpoint, params);
	},
};

// Usage examples
const getData = async () => {
	const data = await apiRequest.get("/data", { id: "123" });
	console.log(data);
};

const postData = async () => {
	const response = await apiRequest.post("/data", { name: "John Doe" });
	console.log(response);
};

const putData = async () => {
	const response = await apiRequest.put("/data/123", { name: "Jane Doe" });
	console.log(response);
};

const deleteData = async () => {
	const response = await apiRequest.delete("/data/123");
	console.log(response);
};
