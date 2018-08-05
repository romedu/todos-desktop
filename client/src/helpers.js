//Working with data received from the db
export const extractProperty = (propName, arr) => arr.map(item => item[propName]);
export const findById = (id, arr) => arr.find(item => (item._id === id));

//Working with strings
export const capitalizeWord = word => word.split("").map((char, index) => !index ? char.toUpperCase() : char).join("");