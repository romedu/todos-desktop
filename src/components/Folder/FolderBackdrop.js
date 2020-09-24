import React from "react";
import { DropTarget } from "react-dnd";
import Backdrop from "../UI/Backdrop/Backdrop";
import { TODOLIST_DRAG_TYPE } from "../../constants";

const FolderBackdrop = ({ connectDropTarget, isOver, closeHandler }) => {
	if (isOver) closeHandler();

	return (
		<div ref={connectDropTarget}>
			<Backdrop zIndex="2" closeHandler={closeHandler} />
		</div>
	);
};

const dropSpecMethod = {
	drop: () => ({ folderId: null })
};

const collectingFunction = (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver()
});

export default DropTarget(TODOLIST_DRAG_TYPE, dropSpecMethod, collectingFunction)(FolderBackdrop);
