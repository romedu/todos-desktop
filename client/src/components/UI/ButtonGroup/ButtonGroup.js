import React from "react";
import Button from "../Button/Button";
import "./ButtonGroup.css";

const ButtonGroup = ({buttons, small, setting}) => {
   const btnGroup = buttons.map((button, index) => (
      <Button key={`${index}${button.text}`} action={button.action} color={`group ${button.color}`} type={button.type}>
         {button.text}
      </Button>
   ));

   return (
      <div className={`${!setting ? "ButtonGroup" : "SettingsGroup"} ${small ? "Small" : null}`}>
         {btnGroup}
      </div>
   );
};

export default ButtonGroup;