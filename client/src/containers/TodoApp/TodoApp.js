import React, {Component} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import TodoDesktop from "../TodoDesktop/TodoDesktop";
import TodoFile from "../TodoFile/TodoFile";
import "./TodoApp.css";

class TodoApp extends Component {
   render(){
      return (
         <div className="TodoApp">
            <Switch>
               <Route exact path="/" component={TodoDesktop} />
               <Route path="/todos/:id" component={TodoFile} />
               <Redirect from="/todos" to="/" />
            </Switch>
         </div>
      );
   }
};

export default TodoApp;