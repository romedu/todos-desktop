import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {authenticateUser, verifyToken} from "../../../store/actions/auth";
import {createMessage} from "../../../store/actions/message";
import InputField from "../../UI/InputField/InputField";
import Button from "../../UI/Button/Button";
import Loader from "../../UI/Loader/Loader";
import {capitalizeWord} from "../../../helpers";

class AuthForm extends Component {
   state = {
      login: {
         username: {
            value: "",
            type: "text",
            placeholder: "Your Username",
            maxLength: "20"
         },
         password: {
            value: "",
            type: "password",
            placeholder: "Your Password",
            maxLength: "24"
         }
      },
      register: {
         username: {
            value: "",
            type: "text",
            placeholder: "Only alphanumeric inputs are allowed, between 4 and 20 characters",
            maxLength: "20"
         },
         password: {
            value: "",
            type: "password",
            placeholder: "Between 8 and 24 characters are allowed",
            maxLength: "24"
         },
         confirmPassword: {
            value: "",
            type: "password",
            placeholder: "Repeat the same password as above",
            maxLength: "24"
         }
      },
      isLoading: false
   };

   componentDidUpdate(prevProps){
      const tokenExp = localStorage.getItem("tokenExp"),
            currentTime = Date.now(),
            {message, user, onTokenVerify} = this.props;
      if(!user && (Number(tokenExp) >= currentTime)) onTokenVerify();
      else if(prevProps.message !== message) this.setState(prevState => ({...prevState, isLoading: false}));
   }

   updateInputHandler = e => {
      const {authType} = this.props,
            property = e.target.name,
            newValue = e.target.value;
            
      this.setState(prevState => ({
         [authType]: {
            ...prevState[authType],
            [property]: {
               ...prevState[authType][property],
               value: newValue
            }
         }
      }))
   };

   passwordToggleHandler = inputName => {
      const {authType} = this.props;
      this.setState(prevState => ({
         [authType]: {
            ...prevState[authType],
            [inputName]: {
               ...prevState[authType][inputName],
               type: prevState[authType][inputName].type === "text" ? "password" : "text"
            }
         }
      }));
   }

   authHandler = e => {
      e.preventDefault();
      const {authType, onErrorCreate, onAuthenticate} = this.props,
            {password, confirmPassword} = this.state.register;
      if(authType === "register" && (password.value !== confirmPassword.value)) return onErrorCreate("Password Confirmation doesn't match the password");
      this.setState(prevState => ({...prevState, isLoading: true}), () => onAuthenticate(authType, this.state[authType].username.value, this.state[authType].password.value));
   };

   render(){
      const {authType} = this.props,
            {register} = this.state;
      const title = capitalizeWord(authType);
      const confirmPassword = authType === "register" &&
                   <InputField input={register.confirmPassword} toggleHandler={this.passwordToggleHandler} updateHandler={this.updateInputHandler}>
                      Confirm Password
                    </InputField>;
      const changeAuthType = {
         text: authType === "register" ? "Already an user?" : "New user?",
         linkTo: authType === "register" ? `login` : `register`
      };
      const content = this.state.isLoading ? <Loader />
                                           : (
                                             <form onSubmit={this.authHandler}>
                                                <InputField input={this.state[authType].username} updateHandler={this.updateInputHandler}>
                                                   Username
                                                </InputField>
                                                <InputField input={this.state[authType].password} toggleHandler={this.passwordToggleHandler} updateHandler={this.updateInputHandler}>
                                                   Password
                                                </InputField>
                                                {confirmPassword}
                                                <Link to={changeAuthType.linkTo}> {changeAuthType.text} </Link>
                                                <Button type="submit" design="submit"> Submit </Button>
                                             </form>
                                           )

      return (
         <div>
            <h2> {title} </h2>
            {content}
         </div>
      );
   }
};

const mapStateToProps = state => ({
   user: state.user.id,
   message: state.message.content
});

const mapDispatchToProps = dispatch => ({
   onAuthenticate: (type, username, password) => dispatch(authenticateUser(type, username, password)),
   onTokenVerify: () => dispatch(verifyToken()),
   onErrorCreate: message => dispatch(createMessage("Error", message))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AuthForm));