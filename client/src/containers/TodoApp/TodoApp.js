import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Desktop from "../Desktop/Desktop";
import TodoFile from "../TodoFile/TodoFile";
import NotFound from "../../components/UI/NotFound/NotFound";
import "./TodoApp.css";

const TodoApp = props => (
   <div className="TodoApp">
      <Switch>
         <Redirect exact from="/" to="/todos?sort=popularity" />
         <Route exact path="/todos" render={() => <Desktop itemsType="todo" />} />
         <Route exact path="/folders" render={() => <Desktop itemsType="folder" />} />
         <Route path="/todos/:id" component={TodoFile} />
         <Route path="*" component={NotFound} />
      </Switch>
   </div>
);

export default TodoApp;