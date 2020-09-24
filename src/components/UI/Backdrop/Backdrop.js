import React from "react";
import "./Backdrop.css";

const Backdrop = ({ closeHandler, zIndex = 3 }) => (
	<div onClick={closeHandler} style={{ zIndex }} className="Backdrop"></div>
);

export default Backdrop;
