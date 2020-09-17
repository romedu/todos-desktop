import React from "react";
import { connect } from "react-redux";
import { DragSource } from "react-dnd";
import ItemThumbnail from "../ItemThumbnail/ItemThumbnail";
import { updateList } from "../../../store/actions/todoList";
import { TODOLIST_DRAG_TYPE } from "../../../constants";

const TodoListThumbnail = ({ connectDragSource, ...props }) => (
	<div ref={connectDragSource}>
		<ItemThumbnail type="todo" {...props} />
	</div>
);

const dragSpecMethods = {
	beginDrag: props => ({ id: props.itemId }),
	endDrag(props, monitor) {
		const todoList = monitor.getItem();
		const dropResult = monitor.getDropResult();

		if (dropResult) props.moveTodoListToFolder(todoList.id, dropResult.folderId);
	}
};

const collectingFunction = (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
});

const mapDispatchToProps = dispatch => ({
	moveTodoListToFolder: (listId, folderId) => dispatch(updateList(listId, null, { container: folderId }))
});

export default connect(
	null,
	mapDispatchToProps
)(DragSource(TODOLIST_DRAG_TYPE, dragSpecMethods, collectingFunction)(TodoListThumbnail));
