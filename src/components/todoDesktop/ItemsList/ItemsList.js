import React from "react";
import FolderThumbnail from "../FolderThumbnail/FolderThumbnail";
import TodoListThumbnail from "../TodoListThumbnail/TodoListThumbnail";
import "./ItemsList.css";

const ItemsList = ({ items }) => {
	const thumbnailsList = items.map(item => {
		const Thumnail = item.files ? FolderThumbnail : TodoListThumbnail;
		return <Thumnail key={item._id} name={item.name} itemId={item._id} containerId={item.container} />;
	});

	return (
		<div className="itemsList">
			<ul> {thumbnailsList} </ul>
		</div>
	);
};

export default ItemsList;
