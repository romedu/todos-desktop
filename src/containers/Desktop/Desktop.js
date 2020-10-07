import React, { Component } from "react";
import { connect } from "react-redux";
import { DropTarget } from "react-dnd";
import ItemsList from "../../components/todoDesktop/ItemsList/ItemsList";
import { getFolders } from "../../store/actions/folder";
import { getLists } from "../../store/actions/todoList";
import { TODOLIST_DRAG_TYPE } from "../../constants";
import "./Desktop.css";

class Desktop extends Component {
	componentDidMount() {
		const { onFoldersGet, onTodosGet } = this.props;

		onFoldersGet("name", "ascending", 1);
		onTodosGet("name", "ascending", 1);
	}

	render() {
		const { todos, folders, connectDropTarget } = this.props;

		return (
			<div className="Desktop" ref={connectDropTarget}>
				<h1>Todos Desktop</h1>
				<ItemsList items={folders.concat(todos)} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	todos: state.todoList.lists,
	folders: state.folder.list
});

const mapDispatchToProps = dispatch => ({
	onFoldersGet: (sortProp, sortOrder, pageNum) => dispatch(getFolders(sortProp, sortOrder, pageNum)),
	onTodosGet: (sortProp, sortOrder, pageNum) => dispatch(getLists(sortProp, sortOrder, pageNum))
});

const dropSpecMethod = {
	drop: (props, monitor) => {
		const hasDroppedOnFolder = monitor.didDrop();
		if (!hasDroppedOnFolder) return { folderId: null };
	}
};

const collectingFunction = (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver()
});

export default DropTarget(
	TODOLIST_DRAG_TYPE,
	dropSpecMethod,
	collectingFunction
)(connect(mapStateToProps, mapDispatchToProps)(Desktop));
