import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import {connect} from "react-redux";
import './App.css';
import Nav from "./containers/Nav/Nav";
import Modal from "./components/UI/Modal/Modal";
import TodoApp from "./containers/TodoApp/TodoApp";
import Authentication from "./containers/Authentication/Authentication";
import {verifyToken, logoutUser} from "./store/actions/auth";
import {clearMessage, createMessage} from "./store/actions/message";

class App extends Component {
   componentDidMount(){this.updateToken()}
   componentDidUpdate(){this.updateToken()}

   updateToken = () => {
      const token = localStorage.getItem("token"),
            tokenExp = localStorage.getItem("tokenExp"),
            currentTime = Date.now(),
            {user, onTokenVerify, onUserLogout, onMessageCreate} = this.props;

      if(user && (!token || (tokenExp && Number(tokenExp) <= currentTime))){
         onUserLogout();
         onMessageCreate("Your token is no longer valid, you must relog");
      }
      else if(!user && token) onTokenVerify();
   }

   render(){
      const token = localStorage.getItem("token"),
            {user, message, onMessageClear} = this.props,
            todoApp = token ? <Route path="/" component={TodoApp}/> : <Redirect from="/" to="/authentication" />,
            authentication = token || user ? <Redirect from="/authentication" to="/" /> : <Route path="/authentication" component={Authentication}/>;
      return (
         <BrowserRouter>
            <div className="App">
               <Nav />
               {message.label ? <Modal label={message.label} closeHandler={onMessageClear}> {message.content} </Modal> : null}
               <Switch>
                  {authentication}
                  {todoApp}
               </Switch>
            </div>
         </BrowserRouter>
      );
   }
}

const mapStateToProps = state => ({
   user: state.user.id,
   message: state.message
});

const mapDispatchToProps = dispatch => ({
   onTokenVerify: () => dispatch(verifyToken()),
   onUserLogout: () => dispatch(logoutUser()),
   onMessageClear: () => dispatch(clearMessage()),
   onMessageCreate: message => dispatch(createMessage("Notification", message))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);