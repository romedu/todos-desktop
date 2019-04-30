import React, {Fragment} from "react";
import NavItems from "../NavItems/NavItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import "./SideDrawer.css";

const SideDrawer = ({showing, hideHandler}) => {
   return (
      <Fragment>
         {showing && <Backdrop closeHandler={hideHandler} zIndex="1" />}
         <div className={`SideDrawer ${showing ? "OpenDrawer" : "ClosedDrawer"}`}>
            <NavItems sideDrawer hideHandler={hideHandler} /> 
         </div>
      </Fragment>
   );
};

export default SideDrawer;