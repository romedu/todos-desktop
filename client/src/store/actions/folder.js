import qwest from "qwest";
import actionTypes from "./actionTypes";
import {createMessage} from "./message";
import {extractProperty} from "../../helpers";
qwest.limit(2);

export const getFolders = (sortProp, sortOrder, pageParam) => {
   const token = localStorage.getItem("token");
   return dispatch => {
      qwest.get(`/folder?token=${token}&sortProp=${sortProp}&sortOrder=${sortOrder}&page=${pageParam}&limit=14`)
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
   const token = localStorage.getItem("token"); 
   return dispatch => {
      qwest.get(`/folder?token=${token}`)
         .then(data => JSON.parse(data.response))
         .then(response => {
            const {status, message} = response;
            if(status && status !== 200) throw new Error(message);
            return dispatch(setFolderNames(extractProperty("name", response)));
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
   const token = localStorage.getItem("token");
   return dispatch => {
      qwest.get(`/folder/${folderId}?token=${token}`)
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
   const token = localStorage.getItem("token");
   return dispatch => {
      qwest.post(`/folder?token=${token}`, newFolderData)
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
   const token = localStorage.getItem("token");
   return dispatch => {
      qwest.map("PATCH", `/folder/${folderId}?token=${token}`, payload)
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
   const token = localStorage.getItem("token"),
         keepParam = keep ? "&keep=true" : "";

   return dispatch => {
      qwest["delete"](`/folder/${folderId}?token=${token}${keepParam}`)
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