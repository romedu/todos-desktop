import actionTypes from "../actions/actionTypes";
import * as utilities from "../../utilities/data";

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
				list: utilities.updateItem(action.editedFolder, currentFolderList)
			};

		case actionTypes.DELETE_FOLDER:
			return {
				...prevState,
				list: utilities.removeById(action.folderId, currentFolderList),
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
			const folderWithFileAdded = prevState.current
				? utilities.updateProp(files, prevState.current.files.concat(action.newFile), prevState.current)
				: null;

			return {
				...prevState,
				current: folderWithFileAdded
			};

		case actionTypes.REMOVE_FILE:
			const folderWithFileRemoved = prevState.current
				? utilities.updateProp(files, utilities.removeById(action.fileId, prevState.current.files), prevState.current)
				: null;

			return {
				...prevState,
				current: folderWithFileRemoved
			};

		default:
			return prevState;
	}
};

export default reducer;
