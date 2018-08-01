import qwest from "qwest";
import actionTypes from "./actionTypes";
import {createMessage} from "./message";
import {addNewFile, updateFile, removeFile} from "./folder";
qwest.limit(2);

export const getLists = () => {
   return dispatch => {
      const token = localStorage.getItem("token");
      qwest.get(`/todos?token=${token}`)
         .then(data => JSON.parse(data.response))
         .then(response => {
            const {status, message} = response;
            if(status && status !== 200) throw new Error(message);
            return dispatch(setList(actionTypes.GET_LISTS, response));
         })
         .catch(error => dispatch(createMessage("Error", error.message)));
   }
};

export const openList = listId => {
   return dispatch => {
      const token = localStorage.getItem("token");
      qwest.get(`/todos/${listId}?token=${token}`)
         .then(data => JSON.parse(data.response))
         .then(response => {
            const {status, message} = response;
            if(status && status !== 200) throw new Error(message);
            return dispatch(setList(actionTypes.OPEN_LIST, null, response));
         })
         .catch(error => dispatch(createMessage("Error", error.message)));
   }
};

export const closeList = () => setList(actionTypes.CLOSE_LIST);

const setList = (type, lists, list) => ({
   type,
   lists,
   list
});

export const createList = newList => {
   return dispatch => {
      const token = localStorage.getItem("token");
      qwest.post(`/todos?token=${token}`, newList)
         .then(data => JSON.parse(data.response))
         .then(response => {
            const {status, message, folderName} = response;
            if(status && status !== 201) throw new Error(message);
            if(folderName) return dispatch(addNewFile(response));
            return dispatch(addList(response));
         })
         .catch(error => createMessage("Error", error.message));
   }
};

const addList = newList => ({
   type: actionTypes.CREATE_LIST,
   newList
});

export const updateList = (listId, listFolder, payload) => {
   return dispatch => {
      const token = localStorage.getItem("token");
      qwest.map("PATCH", `/todos/${listId}?token=${token}`, payload)
         .then(data => JSON.parse(data.response))
         .then(response => {
            const {status, message, folderName} = response;
            if(status && status !== 200) throw new Error(message);
            if(folderName === listFolder) return dispatch(updateFile(response));
            else if(listFolder) return dispatch(removeFile(listId));
            return dispatch(editList(listId, response));
         })
         .catch(error => dispatch(createMessage("Error", error.message)));
   }
};

const editList = (listId, editedList) => ({
   type: actionTypes.UPDATE_LIST,
   listId,
   editedList
});

export const deleteList = (listId, inFolder) => {
   return dispatch => {
      const token = localStorage.getItem("token");
      qwest["delete"](`/todos/${listId}?token=${token}`)
         .then(data => JSON.parse(data.response))
         .then(response => {
            const {status, message} = response;
            if(status && status !== 200) throw new Error(message);
            if(inFolder) return dispatch(removeFile(listId));
            return dispatch(removeList(listId));
         })
         .catch(error => dispatch(createMessage("Error", error.message)));
   }
};

const removeList = listId => ({
   type: actionTypes.DELETE_LIST,
   listId
});