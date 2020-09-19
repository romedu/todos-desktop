import actionTypes from "../actions/actionTypes";
import * as helpers from "../../helpers";

const initialState = {
	list: [],
	current: null,
	paginationData: {
		limit: 0,
		total: 0
	}
};

const reducer = (prevState = initialState, action) => {
	const { list: currentFolderList } = prevState;

	switch (action.type) {
		case actionTypes.GET_FOLDERS:
			return { ...prevState, list: action.folders, paginationData: action.paginationData };

		case actionTypes.CREATE_FOLDER:
			return {
				...prevState,
				list:
					prevState.paginationData.limit > currentFolderList.length
						? currentFolderList.concat(action.newFolder)
						: currentFolderList,
				paginationData: {
					...prevState.paginationData,
					total: prevState.paginationData.total + 1
				}
			};

		case actionTypes.UPDATE_FOLDER:
			return {
				...prevState,
				list: helpers.updateItem(action.editedFolder, currentFolderList)
			};

		case actionTypes.DELETE_FOLDER:
			return {
				...prevState,
				list: helpers.removeById(action.folderId, currentFolderList),
				paginationData: {
					...prevState.paginationData,
					total: prevState.paginationData.total - 1
				}
			};

		case actionTypes.OPEN_FOLDER:
			return { ...prevState, current: action.folder };

		case actionTypes.CLOSE_FOLDER:
			return { ...prevState, current: null };

		case actionTypes.ADD_FILE:
			return {
				...prevState,
				current: {
					...prevState.current,
					files: prevState.current.files.concat(action.newFile)
				}
			};

		case actionTypes.REMOVE_FILE:
			return {
				...prevState,
				current: {
					...prevState.current,
					files: helpers.removeById(action.fileId, prevState.current.files)
				}
			};

		default:
			return prevState;
	}
};

export default reducer;
