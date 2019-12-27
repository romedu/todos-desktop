import React from "react";
import "./Hamburger.css";

const Hamburger = props => (
   <div onClick={props.toggleNav} className="Hamburger">
      <div></div>
      <div></div>
      <div></div>
   </div>
);

export default Hamburger;