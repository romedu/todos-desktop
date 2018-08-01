import React from "react";
import "./Backdrop.css";

const Backdrop = ({action, coverNav, backDropped}) => {
   const mobileOnly = coverNav ? "" : "mobileOnly";
   return (<div onClick={action} className={`Backdrop ${mobileOnly} ${backDropped ? "backDropped" : ""}`}></div>);
}

export default Backdrop;