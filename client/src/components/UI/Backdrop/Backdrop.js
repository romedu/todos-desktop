import React from "react";
import "./Backdrop.css";

const Backdrop = ({closeHandler, coverNav, slightDrop, zIndex}) => {
   const mobileOnly = !coverNav && "mobileOnly";
   return (<div onClick={closeHandler} style={{zIndex}} className={`Backdrop ${mobileOnly} ${slightDrop && "slightDrop"}`}></div>);
}

export default Backdrop;