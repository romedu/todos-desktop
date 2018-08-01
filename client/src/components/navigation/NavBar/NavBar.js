import React from "react";
import Logo from "../../UI/Logo/Logo";
import NavItems from "../NavItems/NavItems";
import "./NavBar.css";

const NavBar = props => {
   return (
      <div className="NavBar">
        <Logo />
        <NavItems /> 
      </div>
   );
};

export default NavBar;