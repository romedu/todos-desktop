import React, {Fragment} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {logoutUser} from "../../../store/actions/auth";
import NavItem from "../NavItem/NavItem";
import "./NavItems.css";

const NavItems = props => {
   let {user, sideDrawer, onLogoutHandler, hideHandler} = props,
       logoutAction = () => {
         onLogoutHandler();
         if(hideHandler) hideHandler();
       };
   let userNav = user ? <NavItem action={logoutAction} url={"/authentication/login"} inNav> Logout </NavItem>
                      : (<Fragment>
                           <NavItem url={"/authentication/login"} action={hideHandler} inNav> Login </NavItem>
                           <NavItem url={"/authentication/register"} action={hideHandler} inNav> Register </NavItem>  
                        </Fragment>);

   return (
      <div className={sideDrawer ? "DrawerItems" : "NavItems"}>
         <NavItem url={"/"} action={hideHandler} inNav> Home </NavItem>
         <NavItem url={"/help"} action={hideHandler} inNav> Help </NavItem>
         {userNav}
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