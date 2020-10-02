import actionTypes from "./actionTypes";
import { createMessage } from "./message";
import { addFile, removeFile } from "./folder";
import { makeDeleteRequest, makeGetRequest, makePatchRequest, makePostRequest } from "../../utilities/services";

const setLists = (lists, paginationData) => ({
	type: actionTypes.GET_LISTS,
	lists,
	paginationData
});

const setCurrent = list => ({
	type: actionTypes.OPEN_LIST,
	list
});

const addList = newList => ({
	type: actionTypes.CREATE_LIST,
	newList
});

const editList = editedList => ({
	type: actionTypes.UPDATE_LIST,
	editedList
});

const removeList = listId => ({
	type: actionTypes.DELETE_LIST,
	listId
});

export const getLists = (sortProp, sortOrder, pageNum) => {
	return async dispatch => {
		try {
			const reqUrl = `/api/todoList?sortProp=${sortProp}&sortOrder=${sortOrder}&folderLess=true&page=${pageNum}&limit=14`;
			const { docs, total, limit } = await makeGetRequest(reqUrl);

			return dispatch(setLists(docs, { limit, total }));
		} catch (error) {
			dispatch(createMessage("Error", error.message));
		}
	};
};

export const openList = listId => {
	return async dispatch => {
		try {
			const reqUrl = `/api/todoList/${listId}`;
			const todoList = await makeGetRequest(reqUrl);

			return dispatch(setCurrent(todoList));
		} catch (error) {
			dispatch(createMessage("Error", error.message));
		}
	};
};

export const closeList = () => ({
	type: actionTypes.CLOSE_LIST
});

export const createList = newListData => {
	return async dispatch => {
		try {
			const reqUrl = "/api/todoList";
			const newList = await makePostRequest(reqUrl, newListData);

			if (newList.container) return dispatch(addFile(newList));
			else return dispatch(addList(newList));
		} catch (error) {
			dispatch(createMessage("Error", error.message));
		}
	};
};

export const moveList = (listId, moveFrom, moveTo, shouldAddToFolder) => {
	return async dispatch => {
		try {
			const reqUrl = `/api/todoList/${listId}`;
			const payload = { container: moveTo };
			const movedList = await makePatchRequest(reqUrl, payload);
			const isListInDesktop = !moveFrom;

			if (isListInDesktop) {
				dispatch(removeList(movedList._id));
				if(shouldAddToFolder) dispatch(addFile(movedList));
			} else dispatch(addList(movedList));
		} catch (error) {
			dispatch(createMessage("Error", error.message));
		}
	};
};

export const deleteList = (listId, insideFolder) => {
	return async dispatch => {
		try {
			const reqUrl = `/api/todoList/${listId}`;

			await makeDeleteRequest(reqUrl);
			if (insideFolder) return dispatch(removeFile(listId));
			return dispatch(removeList(listId));
		} catch (error) {
			dispatch(createMessage("Error", error.message));
		}
	};
};
