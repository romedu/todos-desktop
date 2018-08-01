import React, {Fragment} from "react";
import Backdrop from "../Backdrop/Backdrop";
import "./Modal.css";

const Modal = ({label, children, backDropped, closeHandler}) => (
   <Fragment>
      {<Backdrop action={closeHandler} coverNav backDropped={backDropped}/>}
      <div className={`Modal ${(label === "Confirmation") && label}`}>
         <h3> {label} </h3>
         {children}
      </div>
   </Fragment>
);

export default Modal;