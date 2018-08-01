import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import AuthForm from "../../components/authentication/AuthForm/AuthForm";
import "./Authentication.css";

const Authentication = props => {
   const {match} = props;
   return (
      <div className="Authentication">
         <Switch>
            <Route path={`${match.path}/login`} render={() => <AuthForm type={"login"} />} />
            <Route path={`${match.path}/register`} render={() => <AuthForm type={"register"} />} />
            <Redirect from={"/"} to={`${match.path}/login`} />
         </Switch>
      </div>
   );
};

export default Authentication;