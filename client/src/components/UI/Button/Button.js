import React from "react";
import "./Button.css"

const Button = props => {
   const {action, design, children, type, disabled} = props;
   return (
      <button className={`Button ${design}Btn`} type={type} onClick={action} disabled={disabled}> 
         {children}
      </button>
   );
};

export default Button;