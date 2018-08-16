//Working with data received from the db
export const extractProperty = (propName, arr) => arr.map(item => item[propName]);
export const findByProp = (prop, propValue, arr) => arr.find(item => (item[prop] === propValue));
export const removeById = (id, arr) => arr.filter(item => (item._id !== id));
export const updateItem = (editedItem, arr) => arr.map(item => item._id === editedItem._id ? editedItem : item);
// export const sortByProp = (prop, arr) => arr.sort((a, b) => (b[prop] - a[prop]));

//Working with strings
export const capitalizeWord = word => word.split("").map((char, index) => !index ? char.toUpperCase() : char).join("");
export const toKebabCase = string => string.toLowerCase().split(" ").join("-");
export const getQueries = queryString => queryString.slice(1).split("&").map(queryPair => queryPair.split("=")).reduce((acc, nextVal) => {
      acc[nextVal[0]] = nextVal[1];
      return acc;
}, {});  