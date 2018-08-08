import React, {Fragment} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {logoutUser} from "../../../store/actions/auth";
import NavItem from "../NavItem/NavItem";
import "./NavItems.css";

const NavItems = props => {
   let {user, onLogoutHandler, sideDrawer} = props;
   let userNav = user ? <NavItem action={onLogoutHandler} url={"/authentication/login"} inNav> Logout </NavItem>
                      : (<Fragment>
                           <NavItem url={"/authentication/login"} inNav> Login </NavItem>
                           <NavItem url={"/authentication/register"} inNav> Register </NavItem>  
                        </Fragment>);

   return (
      <div className={sideDrawer ? "SideDrawer" : "NavItems"}>
         <NavItem url={"/"} inNav> Home </NavItem>
         <NavItem url={"/help"} inNav> Help </NavItem>
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