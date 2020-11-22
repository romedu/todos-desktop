import React from "react";
import { DropTarget } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { TODOLIST_DRAG_TYPE } from "../../../constants";
import "./ItemTrashDropArea.css";

const ItemTrashDropArea = ({ isOver, connectDropTarget }) => {
	const iconColor = isOver ? "black" : "gray";

	return (
		<div className="itemTrashDropArea" ref={connectDropTarget}>
			<FontAwesomeIcon size="5x" icon={faTrashAlt} color={iconColor} />
		</div>
	);
};

const dropSpecMethod = {
	drop: () => {
		console.log("Remove Item");
	}
};

const collectingFunction = (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver()
});

export default DropTarget(TODOLIST_DRAG_TYPE, dropSpecMethod, collectingFunction)(ItemTrashDropArea);
