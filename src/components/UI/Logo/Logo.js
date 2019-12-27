import React from "react";
import {Link} from "react-router-dom";
import noteLogo from "../../../assets/images/todos-desktop-logo.png";
import "./Logo.css";

const Logo = props => (
   <Link to="/landing">
      <img src={noteLogo} alt="Logo" className="Logo" />
   </Link>
);

export default Logo;