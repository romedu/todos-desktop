import React from "react";
import "./Button.css"

const Button = ({action, design, children, type, disabled}) => {
   return (
      <button className={`Button ${design}Btn`} type={type} onClick={action} disabled={disabled}> 
         {children}
      </button>
   );
};

export default Button;