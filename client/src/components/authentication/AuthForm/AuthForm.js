import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {authenticateUser, verifyToken} from "../../../store/actions/auth";
import {createMessage} from "../../../store/actions/message";
import InputField from "../../UI/InputField/InputField";
import Button from "../../UI/Button/Button";
import Loader from "../../UI/Loader/Loader";

class AuthForm extends Component {
   state = {
      login: {
         username: {
            value: ""
         },
         password: {
            value: "",
            type: "password"
         }
      },
      register: {
         username: {
            value: ""
         },
         password: {
            value: "",
            type: "password"
         },
         confirmPassword: {
            value: "",
            type: "password"
         }
      },
      isLoading: false
   };

   componentDidUpdate(prevProps){
      const token = localStorage.getItem("token"),
            tokenExp = localStorage.getItem("tokenExp"),
            currentTime = Date.now(),
            {message, user, onTokenVerify} = this.props;
      if(!user && token && tokenExp && Number(tokenExp) >= currentTime) onTokenVerify();
      else if(prevProps.message !== message) this.setState(prevState => ({...prevState, isLoading: false}));
   }

   updateInputHandler = (property, newValue) => (
      this.setState((prevState, props) => ({
         ...prevState,
         [props.type]: {
            ...prevState[props.type],
            [property]: {
               ...prevState[props.type][property],
               value: newValue
            }
         }
      }))
   );

   passwordToggleHandler = inputName => {
      this.setState((prevState, props) => ({
         ...prevState,
         [props.type]: {
            ...prevState[props.type],
            [inputName]: {
               ...prevState[props.type][inputName],
               type: prevState[props.type][inputName].type === "text" ? "password" : "text"
            }
         }
      }));
   }

   authHandler = e => {
      e.preventDefault();
      const {type, onErrorCreate} = this.props,
            {password, confirmPassword} = this.state.register;
      if(type === "register" && (password.value !== confirmPassword.value)) return onErrorCreate("Password Confirmation doesn't match the password");
      this.props.authenticate(type, this.state[type].username.value, this.state[type].password.value);
      this.setState(prevState => ({...prevState, isLoading: true}));
   };

   render(){
      const {type} = this.props;
      const title = type.split("").map((char, index) => !index ? char.toUpperCase() : char).join("");
      const confirmPassword = type === "register" 
                  ? <InputField value={this.state[type].confirmPassword.value} type={this.state[type].confirmPassword.type} toggler toggleHandler={this.passwordToggleHandler} updateHandler={this.updateInputHandler}>
                      Confirm Password
                    </InputField>
                   : null;
      const changeAuthType = {
         text: type === "register" ? "Already an user?" : "New user?",
         linkTo: type === "register" ? `login` : `register`
      };
      const content = this.state.isLoading ? <Loader />
                                           : (
                                             <form onSubmit={this.authHandler}>
                                                <InputField value={this.state[type].username.value} type={"text"} updateHandler={this.updateInputHandler}>
                                                   Username
                                                </InputField>
                                                <InputField value={this.state[type].password.value} type={this.state[type].password.type} toggler toggleHandler={this.passwordToggleHandler} updateHandler={this.updateInputHandler}>
                                                   Password
                                                </InputField>
                                                {confirmPassword}
                                                <Link to={changeAuthType.linkTo}> {changeAuthType.text} </Link>
                                                <Button color="Submit" type="submit"> Submit </Button>
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
   authenticate: (type, username, password) => dispatch(authenticateUser(type, username, password)),
   onTokenVerify: () => dispatch(verifyToken()),
   onErrorCreate: message => dispatch(createMessage("Error", message))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AuthForm));