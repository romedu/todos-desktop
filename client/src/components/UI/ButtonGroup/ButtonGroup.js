import React from "react";
import NavItem from "../../navigation/NavItem/NavItem";
import Button from "../Button/Button";
import "./ButtonGroup.css";

const ButtonGroup = ({buttons, groupType}) => {
   const btnGroup = buttons.map((button, index) => {
      if(button.url){
         return (
            <NavItem key={`${index}${button.description}`} {...button}>
               {button.description}
            </NavItem>
         );
      }
      return (
         <Button key={`${index}${button.description}`} {...button}>
            {button.description}
         </Button>
      );
   });

   return (
      <span className={`${groupType || "ButtonGroup"}`}>
         {btnGroup}
      </span>
   );
};

export default ButtonGroup;