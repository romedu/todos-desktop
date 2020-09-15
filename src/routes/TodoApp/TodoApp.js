import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import TodoFile from "../../containers/TodoFile/TodoFile";
import NotFound from "../../components/UI/NotFound/NotFound";
import "./TodoApp.css";
import DesktopRoutes from "../DesktopRoutes";

const TodoApp = props => (
	<div className="TodoApp">
		<Switch>
			<Redirect exact from="/" to="/desktop?sort=popularity" />
			<Route path="/desktop" component={DesktopRoutes} />
			<Route path="/todos/:id" component={TodoFile} />
			<Route path="*" component={NotFound} />
		</Switch>
	</div>
);

export default TodoApp;
