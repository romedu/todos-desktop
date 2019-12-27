import React from "react";
import Hamburger from "../../UI/Hamburger/Hamburger";
import Logo from "../../UI/Logo/Logo";
import "./Toolbar.css";

const Toolbar = props => {
   return (
      <div className="Toolbar">
         <Hamburger toggleNav={props.toggleSideDrawer}/>
         <Logo />
      </div>
   );
};

export default Toolbar;