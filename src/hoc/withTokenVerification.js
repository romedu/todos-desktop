import React, {Component} from "react";

// The PassedComponent is required to have the onUserLogout and onMessageCreate methods passed as props
const withTokenVerification = PassedComponent => {
   return class extends Component {
      componentDidUpdate(){
         if(this.isTokenExpired()) this.logoutUser();
      }

      isTokenExpired = () => {
         const tokenExp = localStorage.getItem("tokenExp"),
               currentTime = Date.now();
      
         return tokenExp && Number(tokenExp) <= currentTime;
      }
      
      logoutUser = () => {
         const {onUserLogout, onMessageCreate} = this.props;
         onUserLogout();
         onMessageCreate("Notification", "Your token is no longer valid, you must relog");
      }

      render(){
         const {onUserLogout, onMessageCreate, ...componentProps} = this.props;
         return <PassedComponent {...componentProps} />
      }
   }
}

export default withTokenVerification;