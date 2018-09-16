import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {logoutUser} from "../../../store/actions/auth";
import UserNavItems from "../UserNavItems";
import GuestNavItems from "../GuestNavItems";
import NavItem from "../NavItem/NavItem";
import "./NavItems.css";

const NavItems = props => {
   let {user, sideDrawer, onLogoutHandler, hideHandler} = props,
       logoutAction = () => {
         onLogoutHandler();
         if(hideHandler) hideHandler();
       };

   return (
      <div className={sideDrawer ? "DrawerItems" : "NavItems"}>
         <NavItem url={"/"} action={hideHandler} inNav> Home </NavItem>
         {user ? <UserNavItems logoutHandler={logoutAction} hideHandler={hideHandler} />
               : <GuestNavItems hideHandler={hideHandler} />
         }
      </div>
   );
};

const mapStateToProps = state => ({
   user: state.user.id
});

const mapDispatchToProps = dispatch => ({
   onLogoutHandler: () => dispatch(logoutUser())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavItems));