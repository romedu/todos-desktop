import qwest from "qwest";
qwest.limit(2);

const handleResponse = async ({ response }) => {
	const parsedResponse = await JSON.parse(response);
	const { status, message, ...responseData } = parsedResponse;

	if (status && status > 201) throw new Error(message);
	return responseData;
};

export const makeGetRequest = async url => {
	const headers = { Authorization: localStorage.getItem("token") };
	const data = await qwest.get(url, null, { headers });
	const response = await handleResponse(data);

	return response;
};

export const makePostRequest = async (url, body) => {
	const headers = { Authorization: localStorage.getItem("token") };
	const data = await qwest.post(url, body, { headers });
	const response = await handleResponse(data);

	return response;
};

export const makePatchRequest = async (url, payload) => {
	const headers = { Authorization: localStorage.getItem("token") };
	const data = await qwest.map("PATCH", url, payload, { headers });
	const response = await handleResponse(data);

	return response;
};

export const makeDeleteRequest = async url => {
	const headers = { Authorization: localStorage.getItem("token") };
	const data = await qwest.delete(url, null, { headers });
	const response = await handleResponse(data);

	return response;
};
