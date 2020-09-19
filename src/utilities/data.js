export const findByProp = (prop, propValue, arr) => arr.find(item => item[prop] === propValue);

export const removeById = (id, arr) => arr.filter(item => item._id !== id);

export const updateItem = (editedItem, arr) => arr.map(item => (item._id === editedItem._id ? editedItem : item));
