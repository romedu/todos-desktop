import React from "react";
import Button from "../../UI/Button/Button";
import "./InputField.css";

const InputField = props => {
   const {value, type, children, toggler, toggleHandler, updateHandler} = props;
   const inputName = children === "Confirm Password" ? "confirmPassword" : children.toLowerCase();
   const toggleButton = toggler 
                      ? <Button action={() => toggleHandler(inputName)} color="default" type="button"> 
                           {type === "password" ? "Show" : "Hide"}
                        </Button>
                      : null;

   return (
      <fieldset className="InputField">
         <label> {children} </label>
         <input type={type} name={inputName} value={value} placeholder={children} onChange={e => updateHandler(e.target.name, e.target.value)} autoComplete="off" />
         {toggleButton}
      </fieldset>
   );
};

export default InputField;