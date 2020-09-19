export const capitalizeWord = word => {
	return word
		.split("")
		.map((char, index) => (!index ? char.toUpperCase() : char))
		.join("");
};

export const toKebabCase = string => string.toLowerCase().split(" ").join("-");

export const getQueries = queryString => {
	return queryString
		.slice(1)
		.split("&")
		.map(queryPair => queryPair.split("="))
		.reduce((acc, nextVal) => {
			acc[nextVal[0]] = nextVal[1];
			return acc;
		}, {});
};
