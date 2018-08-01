import qwest from "qwest";
import actionTypes from "./actionTypes";
import {createMessage} from "./message";
qwest.limit(2);

export const getFolders = () => {
   return dispatch => {
      const token = localStorage.getItem("token");
      qwest.get(`/folder?token=${token}`)
         .then(data => JSON.parse(data.response))
         .then(response => {
            const {status, message} = response;
            if(status && status !== 200) throw new Error(message);
            return dispatch(setFolders(response));
         })
         .catch(error => dispatch(createMessage("Error", error.message)));
   }
};

const setFolders = folders => ({
   type: actionTypes.GET_FOLDERS,
   folders
});

export const clearFolders = () => ({
   type: actionTypes.CLEAR_FOLDERS
});

export const openFolder = folderId => {
   return dispatch => {
      const token = localStorage.getItem("token");
      qwest.get(`/folder/${folderId}?token=${token}`)
         .then(data => JSON.parse(data.response))
         .then(response => {
            const {status, message} = response;
            if(status && status !== 200) throw new Error(message);
            return dispatch(setCurrent(response));
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

export const createFolder = newFolder => {
   return dispatch => {
      const token = localStorage.getItem("token");
      qwest.post(`/folder?token=${token}`, newFolder)
         .then(data => JSON.parse(data.response))
         .then(response => {
            const {status, message} = response;
            if(status && status !== 201) throw new Error(message);
            return dispatch(addFolder(response));
         })
         .catch(error => dispatch(createMessage("Error", error.message)));
   }
};

const addFolder = newFolder => ({
   type: actionTypes.CREATE_FOLDER,
   newFolder
});

export const addNewFile = newFile => ({
   type: actionTypes.ADD_NEW_FILE,
   newFile
});

export const updateFolder = (folderId, payload) => {
   return dispatch => {
      const token = localStorage.getItem("token");
      qwest.map("PATCH", `/folder/${folderId}?token=${token}`, payload)
         .then(data => JSON.parse(data.response))
         .then(response => {
            const {status, message} = response;
            if(status && status !== 200) throw new Error(message);
            return dispatch(editFolder(folderId, response));
         })
         .catch(error => createMessage("Error", error.message));
   }
};

const editFolder = (folderId, editedFolder) => ({
   type: actionTypes.UPDATE_FOLDER,
   folderId,
   editedFolder
});

export const updateFile = fileData => ({
   type: actionTypes.UPDATE_FILE,
   fileData
});

export const deleteFolder = (folderId, keep) => {
   return dispatch => {
      const token = localStorage.getItem("token"),
            keepParam = keep ? "&keep=true" : "";
      qwest["delete"](`/folder/${folderId}?token=${token}${keepParam}`)
         .then(data => JSON.parse(data.response))
         .then(resolve => {
            const {status, message} = resolve;
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

export const removeFile = fileId => ({
   type: actionTypes.REMOVE_FILE,
   fileId
});