import React, {Fragment} from "react";
import NavItems from "../NavItems/NavItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import "./SideDrawer.css";

const SideDrawer = ({hideHandler}) => {
   return (
      <Fragment>
         <Backdrop closeHandler={hideHandler}/>
         <div className="SideDrawer">
            <NavItems sideDrawer hideHandler={hideHandler} /> 
         </div>
      </Fragment>
   );
};

export default SideDrawer;