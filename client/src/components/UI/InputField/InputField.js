import React from "react";
import Button from "../../UI/Button/Button";
import "./InputField.css";

const InputField = props => {
   const {input, children, toggleHandler, updateHandler} = props;
   const inputName = children === "Confirm Password" ? "confirmPassword" : children.toLowerCase();
   const toggleButton = toggleHandler &&
                        <Button action={() => toggleHandler(inputName)} type="button"> 
                           {input.type === "password" ? "Show" : "Hide"}
                        </Button>;

   return (
      <fieldset className="InputField">
         <label> {children} </label>
         <input type={input.type} name={inputName} value={input.value} placeholder={input.placeholder} onChange={updateHandler} autoComplete="off" maxLength={input.maxLength} />
         {toggleButton}
      </fieldset>
   );
};

export default InputField;