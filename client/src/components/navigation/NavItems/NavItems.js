import React, {Fragment} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {logoutUser} from "../../../store/actions/auth";
import NavItem from "../NavItem/NavItem";
import "./NavItems.css";

const NavItems = props => {
   let {user, onLogoutHandler, sideDrawer} = props;
   let userNav = user ? <NavItem action={onLogoutHandler} url={"/authentication/login"}> Logout </NavItem>
                      : (<Fragment>
                           <NavItem url={"/authentication/login"}> Login </NavItem>
                           <NavItem url={"/authentication/register"}> Register </NavItem>  
                        </Fragment>);

   return (
      <div className={sideDrawer ? "SideDrawer" : "NavItems"}>
         <NavItem url={"/"}> Home </NavItem>
         <NavItem url={"/help"}> Help </NavItem>
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