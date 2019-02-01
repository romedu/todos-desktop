import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import {connect} from "react-redux";
import './App.css';
import Nav from "./containers/Nav/Nav";
import Modal from "./components/UI/Modal/Modal";
import TodoApp from "./containers/TodoApp/TodoApp";
import Authentication from "./containers/Authentication/Authentication";
import Help from "./containers/Help/Help";
import ReportBug from "./containers/ReportBug/ReportBug";
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
      else if(!user && (Number(tokenExp) > currentTime)) onTokenVerify();
   }

   render(){
      const tokenExp = localStorage.getItem("tokenExp"),
            currentTime = Date.now(),
            {message, onMessageClear} = this.props,
            authRoute = (Number(tokenExp) > currentTime) ? <Redirect from="/authentication" to="/" /> : <Route path="/authentication" component={Authentication}/>,
            todoAppRoute = tokenExp ? <Route path="/" component={TodoApp}/> : <Redirect from="/" to="/authentication" />,
            reportBugRoute = tokenExp && <Route path="/report-bugs" component={ReportBug}/>;
      
      return (
         <BrowserRouter>
            <div className="App">
               <Nav />
               {message.label ? <Modal label={message.label} closeHandler={onMessageClear}> {message.content} </Modal> : null}
               <Switch>
                  {authRoute}
                  {reportBugRoute}
                  {todoAppRoute}
                  <Route path="/help" component={Help} />
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