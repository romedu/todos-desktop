import React from "react";
import DisplayIcon from "../DisplayIcon/DisplayIcon";
import "./IconList.css";

const IconList = ({ items }) => {
	const itemsList = items.map(item => (
		<DisplayIcon type={item.files ? "folder" : "todo"} name={item.name} itemId={item._id} />
	));

	return (
		<div className="IconList">
			<ul> {itemsList} </ul>
		</div>
	);
};

export default IconList;
