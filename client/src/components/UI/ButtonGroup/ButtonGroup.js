import React from "react";
import Button from "../Button/Button";
import "./ButtonGroup.css";

const ButtonGroup = ({buttons, groupType}) => {
   const btnGroup = buttons.map((button, index) => (
      <Button key={`${index}${button.description}`} {...button}>
         {button.description}
      </Button>
   ));

   return (
      <span className={`${groupType || "ButtonGroup"}`}>
         {btnGroup}
      </span>
   );
};

export default ButtonGroup;