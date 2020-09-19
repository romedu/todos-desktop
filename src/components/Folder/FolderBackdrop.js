import React from "react";
import { DropTarget } from "react-dnd";
import Backdrop from "../UI/Backdrop/Backdrop";
import { TODOLIST_DRAG_TYPE } from "../../constants";

const FolderBackdrop = ({ connectDropTarget, closeHandler }) => (
	<div ref={connectDropTarget}>
		<Backdrop closeHandler={closeHandler} zIndex="3" coverNav />
	</div>
);

const dropSpecMethod = {
	drop: props => ({ folderId: null })
};

const collectingFunction = (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop()
});

export default DropTarget(TODOLIST_DRAG_TYPE, dropSpecMethod, collectingFunction)(FolderBackdrop);
