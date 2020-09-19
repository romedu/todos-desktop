import qwest from "qwest";
import actionTypes from "./actionTypes";
import { createMessage } from "./message";
import { addFile, removeFile } from "./folder";
qwest.limit(2);

export const getLists = (sortProp, sortOrder, pageNum) => {
	const headers = { Authorization: localStorage.getItem("token") };
	return dispatch => {
		qwest
			.get(`/api/todoList?sortProp=${sortProp}&sortOrder=${sortOrder}&folderLess=true&page=${pageNum}&limit=14`, null, {
				headers
			})
			.then(data => JSON.parse(data.response))
			.then(response => {
				const { status, message, docs, total, limit } = response;
				if (status && status !== 200) throw new Error(message);
				return dispatch(setLists(docs, { limit, total }));
			})
			.catch(error => dispatch(createMessage("Error", error.message)));
	};
};

const setLists = (lists, paginationData) => ({
	type: actionTypes.GET_LISTS,
	lists,
	paginationData
});

export const openList = listId => {
	const headers = { Authorization: localStorage.getItem("token") };
	return dispatch => {
		qwest
			.get(`/api/todoList/${listId}`, null, { headers })
			.then(data => JSON.parse(data.response))
			.then(response => {
				const { status, message, ...list } = response;
				if (status && status !== 200) throw new Error(message);
				return dispatch(setCurrent(list));
			})
			.catch(error => dispatch(createMessage("Error", error.message)));
	};
};

const setCurrent = list => ({
	type: actionTypes.OPEN_LIST,
	list
});

export const closeList = () => ({
	type: actionTypes.CLOSE_LIST
});

export const createList = (newListData, insideFolder) => {
	const headers = { Authorization: localStorage.getItem("token") };
	return dispatch => {
		qwest
			.post("/api/todoList", newListData, { headers })
			.then(data => JSON.parse(data.response))
			.then(response => {
				const { status, message, ...newList } = response;
				if (status && status !== 201) throw new Error(message);
				if (newList.folderName) {
					if (insideFolder) return dispatch(addFile(newList));
					return dispatch(createMessage("Notification", `New list was added to the "${newList.folderName}" Folder`));
				}
				return dispatch(addList(newList));
			})
			.catch(error => dispatch(createMessage("Error", error.message)));
	};
};

const addList = newList => ({
	type: actionTypes.CREATE_LIST,
	newList
});

export const moveList = (listId, moveFrom, moveTo) => {
	const payload = { container: moveTo };
	const headers = { Authorization: localStorage.getItem("token") };

	return dispatch => {
		qwest
			.map("PATCH", `/api/todoList/${listId}`, payload, { headers })
			.then(data => JSON.parse(data.response))
			.then(response => {
				const { status, message, ...movedList } = response;
				const isListInDesktop = !moveFrom;

				if (status && status !== 200) throw new Error(message);
				if (isListInDesktop) dispatch(removeList(movedList._id));
				else {
					dispatch(removeFile(movedList._id));
					dispatch(addList(movedList));
				}
			})
			.catch(error => dispatch(createMessage("Error", error.message)));
	};
};

const editList = editedList => ({
	type: actionTypes.UPDATE_LIST,
	editedList
});

export const deleteList = (listId, insideFolder) => {
	const headers = { Authorization: localStorage.getItem("token") };
	return dispatch => {
		qwest["delete"](`/api/todoList/${listId}`, null, { headers })
			.then(data => JSON.parse(data.response))
			.then(response => {
				const { status, message } = response;
				if (status && status !== 200) throw new Error(message);
				if (insideFolder) return dispatch(removeFile(listId));
				return dispatch(removeList(listId));
			})
			.catch(error => dispatch(createMessage("Error", error.message)));
	};
};

const removeList = listId => ({
	type: actionTypes.DELETE_LIST,
	listId
});
