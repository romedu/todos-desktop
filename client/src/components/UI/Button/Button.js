import React from "react";
import "./Button.css"

const Button = props => {
   const {action, design, children, type} = props;
   return (
      <button className={`Button ${design}Btn`} type={type} onClick={action}> 
         {children}
      </button>
   );
};

export default Button;