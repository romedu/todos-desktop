import actionTypes from "../actions/actionTypes";
import {extractProperty, findById} from "../../helpers";

const initialState = {
   list: null,
   current: null,
   namesList: []
};

const reducer = (prevState = initialState, action) => {
   switch(action.type){
      case actionTypes.GET_FOLDERS: return {...prevState, list: action.folders, namesList: extractProperty("name", action.folders)};
      case actionTypes.CLEAR_FOLDERS: return {...prevState, list: null};
      case actionTypes.OPEN_FOLDER: return {...prevState, current: action.folder};
      case actionTypes.CLOSE_FOLDER: return {...prevState, current: null};
      case actionTypes.CREATE_FOLDER: return {
         ...prevState, 
         list: prevState.list.concat(action.newFolder),
         namesList: prevState.namesList.concat(action.newFolder.name)
      };
      case actionTypes.ADD_NEW_FILE: return {
         ...prevState,
         list: prevState.list.map(folder => folder._id === prevState.current._id ? {...folder, files: folder.files.concat(action.newFile)} : folder),
         current: {
            ...prevState.current,
            files: prevState.current.files.concat(action.newFile)
         }
      };
      case actionTypes.UPDATE_FOLDER: return {
         ...prevState,
         list: prevState.list.map(folder => (folder._id === action.folderId ? action.editedFolder : folder)),
         namesList: prevState.namesList.map(name => (name === findById(action.folderId, prevState.list).name) ? action.editedFolder.name : name)
      };
      case actionTypes.UPDATE_FILE: return {
         ...prevState,
         current: {
            ...prevState.current,
            files: prevState.current.files.map(file => (file._id === action.fileData._id ? action.fileData : file))
         }
      };
      case actionTypes.DELETE_FOLDER: return {
         ...prevState,
         list: prevState.list.filter(folder => (folder._id !== action.folderId)),
         namesList: prevState.namesList.filter(name => (name !== findById(action.folderId, prevState.list).name))
      };
      case actionTypes.REMOVE_FILE: return {
         ...prevState,
         current: {
            ...prevState.current,
            files: prevState.current.files.filter(file => (file._id !== action.fileId))
         }
      };
      default: return prevState;
   }
};

export default reducer;