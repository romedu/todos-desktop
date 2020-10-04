import React, { Component } from "react";
import { DropTarget } from "react-dnd";
import Backdrop from "../UI/Backdrop/Backdrop";
import { TODOLIST_DRAG_TYPE } from "../../constants";

class FolderBackdrop extends Component {
	state = {
		closeFolderTimeoutID: null
	};

	componentDidUpdate() {
		const { closeFolderTimeoutID } = this.state;
		const { isOver, closeHandler } = this.props;

		if (isOver && !closeFolderTimeoutID) this.setState({ closeFolderTimeoutID: setTimeout(closeHandler, 600) });
		if (closeFolderTimeoutID && !isOver) {
			clearTimeout(closeFolderTimeoutID);
			this.setState({ closeFolderTimeoutID: null });
		}
	}

	render() {
		const { connectDropTarget, closeHandler, isOver } = this.props;
		const droppableStyles = isOver ? { opacity: 0.6 } : {};

		return (
			<div ref={connectDropTarget}>
				<Backdrop zIndex="1" closeHandler={closeHandler} styles={droppableStyles} />
			</div>
		);
	}
}

const dropSpecMethod = {
	drop: () => ({ folderId: null })
};

const collectingFunction = (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver()
});

export default DropTarget(TODOLIST_DRAG_TYPE, dropSpecMethod, collectingFunction)(FolderBackdrop);
