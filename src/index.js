import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import userReducer from "./store/reducers/userReducer";
import folderReducer from "./store/reducers/folderReducer";
import todosReducer from "./store/reducers/todosReducer";
import messageReducer from "./store/reducers/messageReducer";
import sortingReducer from "./store/reducers/sortingReducer";
import actionTypes from "./store/actions/actionTypes";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducers = combineReducers({
	user: userReducer,
	folder: folderReducer,
	todoList: todosReducer,
	message: messageReducer,
	sorting: sortingReducer
});

const rootReducer = (state, action) => {
	if (action.type === actionTypes.LOGOUT) state = undefined;
	return reducers(state, action);
};

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
	<DndProvider backend={HTML5Backend}>
		<Provider store={store}>
			<App />
		</Provider>
	</DndProvider>,
	document.getElementById("root")
);
registerServiceWorker();
