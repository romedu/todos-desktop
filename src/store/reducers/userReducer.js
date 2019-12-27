import actionTypes from "../actions/actionTypes";

const initialState = {
   username: null,
   isAdmin: null,
   id: null
};

const reducer = (prevState = initialState, action) => {
   switch(action.type){
      case actionTypes.LOGIN: return ({
         username: action.username, 
         isAdmin: action.isAdmin,
         id: action.id
      });
      default: return prevState;
   }
}

export default reducer;