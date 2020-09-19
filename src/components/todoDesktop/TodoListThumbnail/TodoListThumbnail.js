import React from "react";
import { connect } from "react-redux";
import { DragSource } from "react-dnd";
import ItemThumbnail from "../ItemThumbnail/ItemThumbnail";
import { moveList } from "../../../store/actions/todoList";
import { TODOLIST_DRAG_TYPE } from "../../../constants";

const TodoListThumbnail = ({ connectDragSource, ...props }) => (
	<div ref={connectDragSource}>
		<ItemThumbnail type="todo" {...props} />
	</div>
);

const dragSpecMethods = {
	beginDrag: props => ({ id: props.itemId, container: props.containerId }),
	endDrag(props, monitor) {
		const todoList = monitor.getItem();
		const dropResult = monitor.getDropResult();

		if (dropResult) props.moveTodoListToFolder(todoList.id, todoList.container, dropResult.folderId);
	}
};

const collectingFunction = (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
});

const mapDispatchToProps = dispatch => ({
	moveTodoListToFolder: (listId, moveFrom, moveTo) => dispatch(moveList(listId, moveFrom, moveTo))
});

export default connect(
	null,
	mapDispatchToProps
)(DragSource(TODOLIST_DRAG_TYPE, dragSpecMethods, collectingFunction)(TodoListThumbnail));
