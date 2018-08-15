import actionTypes from "../actions/actionTypes";

const initialState = {
   property: null,
   order: null,
   label: null
};

const reducer = (prevState = initialState, action) => {
   const {type, ...sortingData} = action;
   if(action.type === actionTypes.SET_SORTING) return {...sortingData};
   return prevState;
};

export default reducer;