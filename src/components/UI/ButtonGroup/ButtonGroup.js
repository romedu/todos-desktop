import React from "react";
import "./ButtonGroup.css";

const ButtonGroup = ({groupType, children}) => (
   <span className={`${groupType || "ButtonGroup"}`}>
      {children}
   </span>
);

export default ButtonGroup;