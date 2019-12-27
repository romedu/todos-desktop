import actionTypes from "../actions/actionTypes";

const initialState = {
   label: null,
   content: null
};

const reducer = (prevState = initialState, action) => {
   switch(action.type){
      case actionTypes.CREATE_MESSAGE: return {label: action.label, content: action.content};
      case actionTypes.CLEAR_MESSAGE: return initialState;
      default: return prevState;
   }
};

export default reducer;