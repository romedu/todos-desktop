import React from "react";
import noteLogo from "../../../assets/images/todos-desktop-logo.png";
import "./Logo.css";

const Logo = props => (
   <div>
      <img src={noteLogo} alt="Logo" className="Logo" />
   </div>
);

export default Logo;