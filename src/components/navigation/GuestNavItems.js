import React, {Fragment} from "react";
import NavItem from "./NavItem/NavItem";

const GuestNavItems = ({hideHandler}) => (
   <Fragment>
      <NavItem url={"/authentication/login"} action={hideHandler} inNav> Login </NavItem>
      <NavItem url={"/authentication/register"} action={hideHandler} inNav> Register </NavItem>
   </Fragment>
);

export default GuestNavItems;