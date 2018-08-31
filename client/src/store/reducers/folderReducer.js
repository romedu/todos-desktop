import actionTypes from "../actions/actionTypes";
import * as helpers from "../../helpers";

const initialState = {
   list: null,
   current: null,
   namesList: null,
   paginationData: {
      limit: 0,
      total: 0
   }
};

const reducer = (prevState = initialState, action) => {
   switch(action.type){
      case actionTypes.GET_FOLDERS: return {...prevState, list: action.folders, current: null, paginationData: action.paginationData};
      case actionTypes.GET_FOLDER_NAMES: return {...prevState, namesList: action.folderNames};
      case actionTypes.CLEAR_FOLDER_LIST: return {...prevState, list: null, paginationData: initialState.paginationData};
      case actionTypes.CLEAR_FOLDERS: return {...prevState, list: null, current: null, paginationData: initialState.paginationData};
      case actionTypes.OPEN_FOLDER: return {...prevState, current: action.folder};
      case actionTypes.CLOSE_FOLDER: return {...prevState, current: null};
      case actionTypes.CREATE_FOLDER: return {
         ...prevState, 
         list: prevState.paginationData.limit > prevState.list.length ? prevState.list.concat(action.newFolder) : prevState.list,
         namesList: prevState.namesList.concat(action.newFolder.name),
         paginationData: {
            ...prevState.paginationData,
            total: prevState.paginationData.total + 1
         }
      };
      case actionTypes.UPDATE_FOLDER: return {
         ...prevState,
         list: helpers.updateItem(action.editedFolder, prevState.list),
         namesList: prevState.namesList.map(name => (name === helpers.findByProp("_id", action.editedFolder._id, prevState.list).name) ? action.editedFolder.name : name)
      };
      case actionTypes.DELETE_FOLDER: return {
         ...prevState,
         list: helpers.removeById(action.folderId, prevState.list),
         namesList: prevState.namesList.filter(name => (name !== helpers.findByProp("_id", action.folderId, prevState.list).name)),
         paginationData: {
            ...prevState.paginationData,
            total: prevState.paginationData.total - 1
         }
      };
      case actionTypes.ADD_NEW_FILE: return {
         ...prevState,
         list: prevState.list.map(folder => folder._id === prevState.current._id ? {...folder, files: folder.files.concat(action.newFile)} : folder),
         current: {
            ...prevState.current,
            files: prevState.current.files.concat(action.newFile)
         }
      };
      case actionTypes.UPDATE_FILE: return {
         ...prevState,
         current: {
            ...prevState.current,
            files: helpers.updateItem(action.editedFile, prevState.current.files)
         }
      };
      case actionTypes.MOVE_FILE: 
         const folderToUpdate = helpers.findByProp("name", action.editedFile.folderName, prevState.list),
               udpatedFolder = Object.assign(folderToUpdate, {files: folderToUpdate.files.concat(action.editedFile)});
         return {
            ...prevState,
            current: {
               ...prevState.current,
               files: helpers.removeById(action.editedFile._id, prevState.current.files)
            },
            list: helpers.updateItem(udpatedFolder, prevState.list)
         };
      case actionTypes.REMOVE_FILE: return {
         ...prevState,
         list: prevState.list.map(folder => folder._id === prevState.current._id ? {...folder, files: helpers.removeById(action.fileId, folder.files)} : folder),
         current: {
            ...prevState.current,
            files: helpers.removeById(action.fileId, prevState.current.files)
         }
      };
      default: return prevState;
   }
};

export default reducer;