//Working with data received from the db
export const extractProperty = (propName, arr) => arr.map(item => item[propName]);
export const findById = (id, arr) => arr.find(item => (item._id === id));
export const removeById = (id, arr) => arr.filter(item => (item._id !== id));
export const updateItem = (editedItem, arr) => arr.map(item => item._id === editedItem._id ? editedItem : item);

//Working with strings
export const capitalizeWord = word => word.split("").map((char, index) => !index ? char.toUpperCase() : char).join("");