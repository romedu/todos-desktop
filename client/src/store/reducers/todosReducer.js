import actionTypes from "../actions/actionTypes";

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
         lists: prevState.lists.map(list => (list._id === action.listId ? action.editedList : list))
      };
      case actionTypes.DELETE_LIST: return {
         ...prevState,
         lists: prevState.lists.filter((todos => todos._id !== action.listId))
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
            todos: prevState.current.todos.reduce((acc, nextVal) => {
               if(nextVal._id === action.todoId) nextVal[action.prop] = action.newValue;
               acc.push(nextVal);
               return acc;
            }, [])
         }
      };
      case actionTypes.DELETE_TODO: return {
         ...prevState,
         current: {
            ...prevState.current,
            todos: prevState.current.todos.filter(todo => todo._id !== action.id)
         }
      }
      default: return prevState;
   }
}

export default reducer;