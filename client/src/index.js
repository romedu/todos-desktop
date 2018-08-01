import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import userReducer from './store/reducers/userReducer';
import folderReducer from "./store/reducers/folderReducer";
import todosReducer from "./store/reducers/todosReducer";
import messageReducer from "./store/reducers/messageReducer";
import thunk from "redux-thunk";
import actionTypes from "./store/actions/actionTypes";

const composeEnhancers = process.env.NODE_ENV ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const reducers = combineReducers({
   user: userReducer,
   folder: folderReducer,
   todoList: todosReducer,
   message: messageReducer
});

const rootReducer = (state, action) => {
   if(action.type === actionTypes.LOGOUT) state = undefined;
   return reducers(state, action);
}

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
