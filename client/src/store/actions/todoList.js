import qwest from "qwest";
import actionTypes from "./actionTypes";
import {createMessage} from "./message";
import {addNewFile, updateFile, removeFile} from "./folder";
qwest.limit(2);

export const getLists = (sortProp, sortOrder) => {
   const token = localStorage.getItem("token");
   return dispatch => {
      qwest.get(`/todos?token=${token}&sortProp=${sortProp}&sortOrder=${sortOrder}&folderLess=true`)
         .then(data => JSON.parse(data.response))
         .then(response => {
            const {status, message} = response;
            if(status && status !== 200) throw new Error(message);
            return dispatch(setLists(response.docs, response.total));
         })
         .catch(error => dispatch(createMessage("Error", error.message)));
   }
};

const setLists = (lists, total) => ({
   type: actionTypes.GET_LISTS,
   lists,
   total
});

export const openList = listId => {
   const token = localStorage.getItem("token");
   return dispatch => {
      qwest.get(`/todos/${listId}?token=${token}`)
         .then(data => JSON.parse(data.response))
         .then(response => {
            const {status, message, ...list} = response;
            if(status && status !== 200) throw new Error(message);
            return dispatch(setCurrent(list));
         })
         .catch(error => dispatch(createMessage("Error", error.message)));
   }
};

const setCurrent = list => ({
   type: actionTypes.OPEN_LIST,
   list
});

export const closeList = () => ({
   type: actionTypes.CLOSE_LIST
});

export const createList = (newListData, insideFolder) => {
   const token = localStorage.getItem("token");
   return dispatch => {
      qwest.post(`/todos?token=${token}`, newListData)
         .then(data => JSON.parse(data.response))
         .then(response => {
            const {status, message, ...newList} = response;
            if(status && status !== 201) throw new Error(message);
            if(newList.folderName){
               if(insideFolder) return dispatch(addNewFile(newList));
               return dispatch(createMessage("Notification", `New list was added to the "${newList.folderName}" Folder`));
            }
            return dispatch(addList(newList));
         })
         .catch(error => createMessage("Error", error.message));
   }
};

const addList = newList => ({
   type: actionTypes.CREATE_LIST,
   newList
});

export const updateList = (listId, listFolder, payload) => {
   const token = localStorage.getItem("token");
   return dispatch => {
      qwest.map("PATCH", `/todos/${listId}?token=${token}`, payload)
         .then(data => JSON.parse(data.response))
         .then(response => {
            const {status, message, ...editedList} = response;
            if(status && status !== 200) throw new Error(message);
            if(listFolder){
               if(editedList.folderName === listFolder) return dispatch(updateFile(editedList));
               return dispatch(removeFile(listId));
            } 
            return dispatch(editList(listId, editedList));
         })
         .catch(error => dispatch(createMessage("Error", error.message)));
   }
};

const editList = (listId, editedList) => ({
   type: actionTypes.UPDATE_LIST,
   listId,
   editedList
});

export const deleteList = (listId, insideFolder) => {
   const token = localStorage.getItem("token");
   return dispatch => {
      qwest["delete"](`/todos/${listId}?token=${token}`)
         .then(data => JSON.parse(data.response))
         .then(response => {
            const {status, message} = response;
            if(status && status !== 200) throw new Error(message);
            if(insideFolder) return dispatch(removeFile(listId));
            return dispatch(removeList(listId));
         })
         .catch(error => dispatch(createMessage("Error", error.message)));
   }
};

const removeList = listId => ({
   type: actionTypes.DELETE_LIST,
   listId
});