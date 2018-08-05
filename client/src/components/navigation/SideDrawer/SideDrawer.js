import React, {Fragment} from "react";
import Logo from "../../UI/Logo/Logo";
import NavItems from "../NavItems/NavItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import "./SideDrawer.css";

const SideDrawer = ({hideHandler}) => {
   return (
      <Fragment>
         <Backdrop closeHandler={hideHandler}/>
         <div className="SideDrawer">
            <Logo />
            <NavItems sideDrawer /> 
         </div>
      </Fragment>
   );
};

export default SideDrawer;