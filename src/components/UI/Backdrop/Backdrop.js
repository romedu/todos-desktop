import React from "react";
import "./Backdrop.css";

const Backdrop = ({ closeHandler, zIndex = 3, styles }) => (
	<div onClick={closeHandler} className="Backdrop" style={{ zIndex, ...styles }}></div>
);

export default Backdrop;
