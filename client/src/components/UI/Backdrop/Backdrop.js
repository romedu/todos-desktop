import React from "react";
import "./Backdrop.css";

const Backdrop = ({closeHandler, coverNav, slightDrop}) => {
   const mobileOnly = !coverNav && "mobileOnly";
   return (<div onClick={closeHandler} className={`Backdrop ${mobileOnly} ${slightDrop && "slightDrop"}`}></div>);
}

export default Backdrop;