import React from "react";
import { DropTarget } from "react-dnd";
import ItemThumbnail from "../ItemThumbnail/ItemThumbnail";
import { TODOLIST_DRAG_TYPE } from "../../../constants";

const FolderThumbnail = ({ connectDropTarget, ...props }) => (
	<div ref={connectDropTarget}>
		<ItemThumbnail type="folder" {...props} />
	</div>
);

const dropSpecMethod = {
	drop: props => ({ folderId: props.itemId })
};

const collectingFunction = (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop()
});

export default DropTarget(TODOLIST_DRAG_TYPE, dropSpecMethod, collectingFunction)(FolderThumbnail);
