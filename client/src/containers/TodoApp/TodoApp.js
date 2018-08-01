import React, {Component} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Desktop from "../Desktop/Desktop";
import TodoFile from "../TodoFile/TodoFile";
import "./TodoApp.css";

class TodoApp extends Component {
   render(){
      return (
         <div className="TodoApp">
            <Switch>
               <Route exact path="/" component={Desktop} />
               <Route path="/todos/:id" component={TodoFile} />
               <Redirect from="/todos" to="/" />
            </Switch>
         </div>
      );
   }
};

export default TodoApp;