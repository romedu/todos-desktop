import React, { Component } from "react";
import { connect } from "react-redux";
import ItemsList from "../../components/todoDesktop/ItemsList/ItemsList";
import { getFolders } from "../../store/actions/folder";
import { getLists } from "../../store/actions/todoList";
import "./Desktop.css";

class Desktop extends Component {
	componentDidMount() {
		const { onFoldersGet, onTodosGet } = this.props;

		onFoldersGet("name", "ascending", 1);
		onTodosGet("name", "ascending", 1);
	}

	render() {
		const { todos, folders } = this.props;

		return (
			<div className="Desktop">
				<h1>Todos Desktop</h1>
				<ItemsList items={folders.concat(todos)} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	todos: state.todoList.lists, // Needed to update the props when removing a todoList
	folders: state.folder.list
});

const mapDispatchToProps = dispatch => ({
	onFoldersGet: (sortProp, sortOrder, pageNum) => dispatch(getFolders(sortProp, sortOrder, pageNum)),
	onTodosGet: (sortProp, sortOrder, pageNum) => dispatch(getLists(sortProp, sortOrder, pageNum))
});

export default connect(mapStateToProps, mapDispatchToProps)(Desktop);
