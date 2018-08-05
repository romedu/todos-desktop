import React from "react";
import Button from "../../UI/Button/Button";
import "./InputField.css";

const InputField = props => {
   const {value, inputType, children, toggleHandler, updateHandler} = props;
   const inputName = children === "Confirm Password" ? "confirmPassword" : children.toLowerCase();
   const toggleButton = toggleHandler &&
                        <Button action={() => toggleHandler(inputName)} type="button"> 
                           {inputType === "password" ? "Show" : "Hide"}
                        </Button>;

   return (
      <fieldset className="InputField">
         <label> {children} </label>
         <input type={inputType} name={inputName} value={value} placeholder={children} onChange={updateHandler} autoComplete="off" />
         {toggleButton}
      </fieldset>
   );
};

export default InputField;