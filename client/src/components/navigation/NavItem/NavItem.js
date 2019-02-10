import React from "react";
import {NavLink, withRouter} from "react-router-dom";
import Button from "../../UI/Button/Button";
import "./NavItem.css";

const NavItem = ({action, url, style, children, inNav, location}) => {
   const {pathname} = location,
         isHomeActive = url === "/" && (pathname === "/folders" || pathname === "/todos");

   return (
      <NavLink tabIndex="-1" exact to={url} className={`NavItem ${isHomeActive && "ActiveNav"}`} activeClassName={inNav ? "ActiveNav" : "ActiveNavLess"}>
         <Button action={action} design={inNav ? "navItem" : style}>
               {children}
         </Button>
      </NavLink>
   );
};

export default withRouter(NavItem);