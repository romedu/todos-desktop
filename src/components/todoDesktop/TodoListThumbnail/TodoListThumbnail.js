import React from "react";
import { connect } from "react-redux";
import { DragSource } from "react-dnd";
import { moveList } from "../../../store/actions/todoList";
import { TODOLIST_DRAG_TYPE } from "../../../constants";
import "./TodoListThumbnail.css";

const TodoListThumbnail = ({ connectDragSource, name, description }) => (
	<div ref={connectDragSource}>
		<li className="itemThumbnail">
			<div className="todoListThumbnail" title={description}></div>
			{name}
		</li>
	</div>
);

const dragSpecMethods = {
	beginDrag: props => ({ id: props.itemId, container: props.containerId }),
	endDrag(props, monitor) {
		const todoList = monitor.getItem();
		const dropResult = monitor.getDropResult();

		if (dropResult) {
			const wasDroppedInNewLocation = todoList.container !== dropResult.folderId;
			const currentFolderId = dropResult.currentFolderId || props.currentFolderId;

			if (wasDroppedInNewLocation) {
				props.moveTodoListToFolder(todoList.id, currentFolderId, todoList.container, dropResult.folderId);
			}
		}
	}
};

const collectingFunction = (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
});

const mapStateToProps = state => ({ currentFolderId: state.folder.current && state.folder.current._id });
const mapDispatchToProps = dispatch => ({
	moveTodoListToFolder: (listId, currentFolderId, moveFrom, moveTo) => {
		return dispatch(moveList(listId, currentFolderId, moveFrom, moveTo));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DragSource(TODOLIST_DRAG_TYPE, dragSpecMethods, collectingFunction)(TodoListThumbnail));
