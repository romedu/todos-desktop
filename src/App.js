import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import {connect} from "react-redux";
import './App.css';
import Nav from "./containers/Nav/Nav";
import Modal from "./components/UI/Modal/Modal";
import LandingPage from "./containers/LandingPage/LandingPage";
import TodoApp from "./containers/TodoApp/TodoApp";
import Authentication from "./containers/Authentication/Authentication";
import Help from "./containers/Help/Help";
import ReportBug from "./containers/ReportBug/ReportBug";
import {verifyToken, logoutUser} from "./store/actions/auth";
import {clearMessage, createMessage} from "./store/actions/message";
import withTokenVerification from "./hoc/withTokenVerification";

class App extends Component {
   componentDidMount(){
      const token = localStorage.getItem("token"),
            tokenExp = localStorage.getItem("tokenExp"),
            currentTime = Date.now(),
            {onTokenVerify} = this.props;

      // If there is a token, check if it is still valid and login the user if needed
      if(token && Number(tokenExp) > currentTime) onTokenVerify();
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
                  <Route path="/help" component={Help} />
                  <Route path="/landing" component={LandingPage} />
                  {authRoute}
                  {reportBugRoute}
                  {todoAppRoute}
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
   onMessageCreate: (label, message) => dispatch(createMessage(label, message))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTokenVerification(App));