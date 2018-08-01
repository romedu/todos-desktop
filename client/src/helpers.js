export const extractProperty = (propName, arr) => arr.map(item => item[propName]);

export const findById = (id, arr) => arr.find(item => (item._id === id));