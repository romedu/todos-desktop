import qwest from "qwest";
import actionTypes from "./actionTypes";
import {createMessage} from "./message";
import {addNewFile, updateFile, moveFile, removeFile} from "./folder";
qwest.limit(2);

export const getLists = (sortProp, sortOrder, pageNum) => {
   const headers = {Authorization: localStorage.getItem("token")};
   return dispatch => {
      qwest.get(`/api/todos?sortProp=${sortProp}&sortOrder=${sortOrder}&folderLess=true&page=${pageNum}&limit=14`, null, {headers})
         .then(data => JSON.parse(data.response))
         .then(response => {
            const {status, message, docs, total, limit} = response;
            if(status && status !== 200) throw new Error(message);
            return dispatch(setLists(docs,{limit, total}));
         })
         .catch(error => dispatch(createMessage("Error", error.message)));
   }
};

const setLists = (lists, paginationData) => ({
   type: actionTypes.GET_LISTS,
   lists,
   paginationData
});

export const openList = listId => {
   const headers = {Authorization: localStorage.getItem("token")};
   return dispatch => {
      qwest.get(`/api/todos/${listId}`, null, {headers})
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
   const headers = {Authorization: localStorage.getItem("token")};
   return dispatch => {
      qwest.post("/api/todos", newListData, {headers})
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
         .catch(error => dispatch(createMessage("Error", error.message)));
   }
};

const addList = newList => ({
   type: actionTypes.CREATE_LIST,
   newList
});

export const updateList = (listId, listFolder, payload) => {
   const headers = {Authorization: localStorage.getItem("token")};
   return dispatch => {
      qwest.map("PATCH", `/api/todos/${listId}`, payload, {headers})
         .then(data => JSON.parse(data.response))
         .then(response => {
            const {status, message, ...editedList} = response;
            if(status && status !== 200) throw new Error(message);
            if(listFolder){
               if(editedList.folderName === listFolder) return dispatch(updateFile(editedList));
               if(!editedList.folderName) return dispatch(removeFile(editedList._id));
               return dispatch(moveFile(editedList));
            }
            //CALLED WHEN CHANGED FROM NO FOLDER TO FOLDER
            else if(editedList.folderName) return dispatch(removeList(editedList._id)); 
            return dispatch(editList(listId, editedList));
         })
         .catch(error => dispatch(createMessage("Error", error.message)));
   }
};

const editList = editedList => ({
   type: actionTypes.UPDATE_LIST,
   editedList
});

export const deleteList = (listId, insideFolder) => {
   const headers = {Authorization: localStorage.getItem("token")};
   return dispatch => {
      qwest["delete"](`/api/todos/${listId}`, null, {headers})
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