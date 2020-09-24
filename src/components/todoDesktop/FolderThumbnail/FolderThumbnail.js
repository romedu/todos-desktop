import React from "react";
import { DropTarget } from "react-dnd";
import ItemThumbnail from "../ItemThumbnail/ItemThumbnail";
import { TODOLIST_DRAG_TYPE } from "../../../constants";
import { Link, withRouter } from "react-router-dom";

const FolderThumbnail = ({ connectDropTarget, isOver, history, ...props }) => {
	const folderPath = `/desktop/${props.itemId}`;

	if (isOver) history.push(folderPath);

	return (
		<div ref={connectDropTarget}>
			<Link to={folderPath}>
				<ItemThumbnail type="folder" {...props} />
			</Link>
		</div>
	);
};

const dropSpecMethod = {
	drop: props => ({ folderId: props.itemId })
};

const collectingFunction = (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop()
});

export default DropTarget(TODOLIST_DRAG_TYPE, dropSpecMethod, collectingFunction)(withRouter(FolderThumbnail));
