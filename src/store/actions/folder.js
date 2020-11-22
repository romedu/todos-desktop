import { makeDeleteRequest, makeGetRequest, makePatchRequest, makePostRequest } from "../../utilities/services";
import actionTypes from "./actionTypes";
import { createMessage } from "./message";

const setFolders = (folders, paginationData) => ({
	type: actionTypes.GET_FOLDERS,
	folders,
	paginationData
});

const setCurrent = folder => ({
	type: actionTypes.OPEN_FOLDER,
	folder
});

const addFolder = newFolder => ({
	type: actionTypes.CREATE_FOLDER,
	newFolder
});

const editFolder = (folderId, editedFolder) => ({
	type: actionTypes.UPDATE_FOLDER,
	folderId,
	editedFolder
});

const removeFolder = folderId => ({
	type: actionTypes.DELETE_FOLDER,
	folderId
});

export const getFolders = (sortProp, sortOrder, pageParam) => {
	return async dispatch => {
		try {
			const reqUrl = `/api/folder?sortProp=${sortProp}&sortOrder=${sortOrder}&page=${pageParam}&limit=14`;
			const { docs, total, limit } = await makeGetRequest(reqUrl);

			return dispatch(setFolders(docs, { limit, total }));
		} catch (error) {
			dispatch(createMessage("Error", error.message));
		}
	};
};

export const openFolder = folderId => {
	return async dispatch => {
		try {
			const reqUrl = `/api/folder/${folderId}`;
			const folder = await makeGetRequest(reqUrl);

			return dispatch(setCurrent(folder));
		} catch (error) {
			dispatch(createMessage("Error", error.message));
		}
	};
};

export const closeFolder = () => ({
	type: actionTypes.CLOSE_FOLDER
});

export const createUntitledFolder = () => {
	const untitledFolder = {
		_id: "untitled",
		name: "untitled",
		files: []
	};

	return addFolder(untitledFolder);
};

export const createFolder = newFolderData => {
	return async dispatch => {
		try {
			const reqUrl = `/api/folder`;
			const newFolder = await makePostRequest(reqUrl, newFolderData);

			return dispatch(editFolder("untitled", newFolder));
		} catch (error) {
			dispatch(createMessage("Error", error.message));
		}
	};
};

export const updateFolder = (folderId, payload) => {
	return async dispatch => {
		try {
			const reqUrl = `/api/folder/${folderId}`;
			const editedFolder = await makePatchRequest(reqUrl, payload);

			return dispatch(editFolder(folderId, editedFolder));
		} catch (error) {
			dispatch(createMessage("Error", error.message));
		}
	};
};

export const deleteFolder = (folderId, shouldKeepTodoLists) => {
	return async dispatch => {
		try {
			const keepParam = shouldKeepTodoLists ? "&keep=true" : "";
			const reqUrl = `/api/folder/${folderId}?${keepParam}`;

			await makeDeleteRequest(reqUrl);
			return dispatch(removeFolder(folderId));
		} catch (error) {
			dispatch(createMessage("Error", error.message));
		}
	};
};

export const addFile = newFile => ({
	type: actionTypes.ADD_FILE,
	newFile
});

export const removeFile = fileId => ({
	type: actionTypes.REMOVE_FILE,
	fileId
});
