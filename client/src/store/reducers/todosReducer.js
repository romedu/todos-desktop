import actionTypes from "../actions/actionTypes";
import {updateItem, removeById} from "../../helpers";

const initialState = {
   lists: null,
   current: null
};

const reducer = (prevState = initialState, action) => {
   switch(action.type){
      case actionTypes.GET_LISTS: return {...prevState, lists: action.lists};
      case actionTypes.CLEAR_LIST: return {...prevState, lists: null};
      case actionTypes.OPEN_LIST: return {...prevState, current: action.list};
      case actionTypes.CLOSE_LIST: return {...prevState, current: null};
      case actionTypes.CREATE_LIST: return {...prevState, lists: prevState.lists.concat(action.newList)};
      case actionTypes.UPDATE_LIST: return {
         ...prevState,
         lists: updateItem(action.editedList, prevState.lists)
      };
      case actionTypes.DELETE_LIST: return {
         ...prevState,
         lists: removeById(action.listId, prevState.lists)
      };
      case actionTypes.CREATE_TODO: return {
         ...prevState,
         current: {
            ...prevState.current,
            todos: prevState.current.todos.concat(action.newTodo)
         }
      };
      case actionTypes.EDIT_TODO: return {
         ...prevState,
         current: {
            ...prevState.current,
            todos: updateItem(action.editedTodo, prevState.current.todos)
         }
      };
      case actionTypes.DELETE_TODO: return {
         ...prevState,
         current: {
            ...prevState.current,
            todos: removeById(action.todoId, prevState.current.todos)
         }
      }
      default: return prevState;
   }
}

export default reducer;