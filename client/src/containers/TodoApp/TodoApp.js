import React, {Component} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Desktop from "../Desktop/Desktop";
import TodoFile from "../TodoFile/TodoFile";
import Help from "../Help/Help";
import NotFound from "../../components/UI/NotFound/NotFound";
import "./TodoApp.css";

class TodoApp extends Component {
   render(){
      return (
         <div className="TodoApp">
            <Switch>
               <Redirect exact from="/" to="/folders?sort=popularity" />
               <Route exact path="/todos" render={() => <Desktop itemsType="todo" />} />
               <Route exact path="/folders" render={() => <Desktop itemsType="folder" />} />
               <Route path="/help" component={Help} />
               <Route path="/todos/:id" component={TodoFile} />
               <Route path="*" component={NotFound} />
            </Switch>
         </div>
      );
   }
};

export default TodoApp;