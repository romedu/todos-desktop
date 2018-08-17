import actionTypes from "../actions/actionTypes";

const initialState = {
   property: "__v",
   order: "descending",
   label: "Popularity"
};

const reducer = (prevState = initialState, action) => {
   const {type, ...sortingData} = action;
   if(action.type === actionTypes.SET_SORTING) return {...sortingData};
   return prevState;
};

export default reducer;