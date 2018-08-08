import React from "react";
import {NavLink, withRouter} from "react-router-dom";
import Button from "../../UI/Button/Button";
import "./NavItem.css";

const NavItem = props => {
   const {action, url, style, children, inNav, location} = props,
         {pathname} = location,
         activeHomeClass = url === "/" && (pathname === "/folders" || pathname === "/todos") ? "ActiveNav" : "";

   return (
      <NavLink exact to={url} className={activeHomeClass} activeClassName={inNav ? "ActiveNav" : "ActiveNavLess"}>
         <Button action={action} design={inNav ? "navItem" : style}>
               {children}
         </Button>
      </NavLink>
   );
};

export default withRouter(NavItem);