import qwest from "qwest";
import actionTypes from "./actionTypes";
import {createMessage} from "./message";
import {extractProperty} from "../../helpers";
qwest.limit(2);

export const getFolders = (sortProp, sortOrder, pageParam) => {
   const headers = {Authorization: localStorage.getItem("token")};
   return dispatch => {
      qwest.get(`/api/folder?sortProp=${sortProp}&sortOrder=${sortOrder}&page=${pageParam}&limit=14`, null, {headers})
         .then(data => JSON.parse(data.response))
         .then(response => {
            const {status, message, docs, total, limit} = response;
            if(status && status !== 200) throw new Error(message);
            return dispatch(setFolders(docs, {limit, total}));
         })
         .catch(error => dispatch(createMessage("Error", error.message)));
   }
};

const setFolders = (folders, paginationData) => ({
   type: actionTypes.GET_FOLDERS,
   folders,
   paginationData
});

export const getFolderNames = () => {
   const headers = {Authorization: localStorage.getItem("token")}; 
   return dispatch => {
      qwest.get("/api/folder", null, {headers})
         .then(data => JSON.parse(data.response))
         .then(response => {
            const {status, message} = response;
            if(status && status !== 200) throw new Error(message);
            return dispatch(setFolderNames(extractProperty("name", response.docs)));
         })
         .catch(error => dispatch(createMessage("Error", error.message)));
   }
}

const setFolderNames = folderNames => ({
   type: actionTypes.GET_FOLDER_NAMES,
   folderNames
});

export const clearFoldersList = () => ({
   type: actionTypes.CLEAR_FOLDER_LIST
});

export const clearFolders = () => ({
   type: actionTypes.CLEAR_FOLDERS
});

export const openFolder = folderId => {
   const headers = {Authorization: localStorage.getItem("token")};
   return dispatch => {
      qwest.get(`/api/folder/${folderId}`, null, {headers})
         .then(data => JSON.parse(data.response))
         .then(response => {
            const {status, message, ...folder} = response;
            if(status && status !== 200) throw new Error(message);
            return dispatch(setCurrent(folder));
         })
         .catch(error => dispatch(createMessage("Error", error.message)));
   }
};

const setCurrent = folder => ({
   type: actionTypes.OPEN_FOLDER,
   folder
});

export const closeFolder = () => ({
   type: actionTypes.CLOSE_FOLDER
});

export const createFolder = newFolderData => {
   const headers = {Authorization: localStorage.getItem("token")};
   return dispatch => {
      qwest.post("/api/folder", newFolderData, {headers})
         .then(data => JSON.parse(data.response))
         .then(response => {
            const {status, message, ...newFolder} = response;
            if(status && status !== 201) throw new Error(message);
            return dispatch(addFolder(newFolder));
         })
         .catch(error => dispatch(createMessage("Error", error.message)));
   }
};

const addFolder = newFolder => ({
   type: actionTypes.CREATE_FOLDER,
   newFolder
});

export const updateFolder = (folderId, payload) => {
   const headers = {Authorization: localStorage.getItem("token")};
   return dispatch => {
      qwest.map("PATCH", `/api/folder/${folderId}`, payload, {headers})
         .then(data => JSON.parse(data.response))
         .then(response => {
            const {status, message, ...editedFolder} = response;
            if(status && status !== 200) throw new Error(message);
            return dispatch(editFolder(editedFolder));
         })
         .catch(error => dispatch(createMessage("Error", error.message)));
   }
};

const editFolder = editedFolder => ({
   type: actionTypes.UPDATE_FOLDER,
   editedFolder
});

export const deleteFolder = (folderId, keep) => {
   const headers = {Authorization: localStorage.getItem("token")},
         keepParam = keep ? "&keep=true" : "";

   return dispatch => {
      qwest["delete"](`/api/folder/${folderId}?${keepParam}`, null, {headers})
         .then(data => JSON.parse(data.response))
         .then(response => {
            const {status, message} = response;
            if(status && status !== 200) throw new Error(message);
            return dispatch(removeFolder(folderId));
         })
         .catch(error => dispatch(createMessage("Error", error.message)));
   }
};

const removeFolder = folderId => ({
   type: actionTypes.DELETE_FOLDER,
   folderId
});

export const addNewFile = newFile => ({
   type: actionTypes.ADD_NEW_FILE,
   newFile
});

export const updateFile = editedFile => ({
   type: actionTypes.UPDATE_FILE,
   editedFile
});

export const moveFile = editedFile => ({
   type: actionTypes.MOVE_FILE,
   editedFile
});

export const removeFile = fileId => ({
   type: actionTypes.REMOVE_FILE,
   fileId
});