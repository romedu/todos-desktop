import React from "react";
import ItemThumbnail from "../ItemThumbnail/ItemThumbnail";
import "./ItemsList.css";

const ItemsList = ({ items }) => {
	const thumbnailsList = items.map(item => (
		<ItemThumbnail key={item._id} type={item.files ? "folder" : "todo"} name={item.name} itemId={item._id} />
	));

	return (
		<div className="itemsList">
			<ul> {thumbnailsList} </ul>
		</div>
	);
};

export default ItemsList;
