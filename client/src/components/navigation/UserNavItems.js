import React, {Fragment} from "react";
import NavItem from "./NavItem/NavItem";

const UserNavItems = ({logoutHandler, hideHandler}) => (
   <Fragment>
      <NavItem url={"/help"} action={hideHandler} inNav> Help </NavItem>
      <NavItem url={"/report-bugs"} action={hideHandler} inNav> Report Bugs </NavItem>
      <NavItem action={logoutHandler} url={"/authentication/login"} inNav> Logout </NavItem>
   </Fragment>
);

export default UserNavItems;