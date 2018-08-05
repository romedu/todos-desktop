import React, {Fragment} from "react";
import Backdrop from "../Backdrop/Backdrop";
import "./Modal.css";

const Modal = ({label, children, slightDrop, closeHandler}) => (
   <Fragment>
      <Backdrop closeHandler={closeHandler} slightDrop={slightDrop} coverNav/>
      <div className={`Modal ${(label === "Confirmation") && label}`}>
         <h3> {label} </h3>
         {children}
      </div>
   </Fragment>
);

export default Modal;