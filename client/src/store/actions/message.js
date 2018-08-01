import actionTypes from "./actionTypes";

export const createMessage = (label, content) => ({
   type: actionTypes.CREATE_MESSAGE,
   label,
   content
});

export const clearMessage = () => ({
   type: actionTypes.CLEAR_MESSAGE
});