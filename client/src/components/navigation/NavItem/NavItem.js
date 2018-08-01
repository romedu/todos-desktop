import React from "react";
import {NavLink} from "react-router-dom";
import "./NavItem.css";

const NavItem = ({action, url, children}) => (
   <NavLink exact to={url} activeClassName="ActiveNav">
      <button onClick={action} className="NavItem">
            {children}
      </button>
   </NavLink>
);

export default NavItem;