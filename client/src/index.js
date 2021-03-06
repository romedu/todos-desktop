import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, combineReducers, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import userReducer from './store/reducers/userReducer';
import folderReducer from "./store/reducers/folderReducer";
import todosReducer from "./store/reducers/todosReducer";
import messageReducer from "./store/reducers/messageReducer";
import sortingReducer from "./store/reducers/sortingReducer";
import thunk from "redux-thunk";
import actionTypes from "./store/actions/actionTypes";

const reducers = combineReducers({
   user: userReducer,
   folder: folderReducer,
   todoList: todosReducer,
   message: messageReducer,
   sorting: sortingReducer
});

const rootReducer = (state, action) => {
   if(action.type === actionTypes.LOGOUT) state = undefined;
   return reducers(state, action);
}

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
