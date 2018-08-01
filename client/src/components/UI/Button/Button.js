import React from "react";
import "./Button.css"

const Button = props => {
   const {action, color, children, type} = props;
   return (
      <button className={`Button ${color}Btn`} onClick={action} type={type}> 
         {children}
      </button>
   );
};

export default Button;