import React, { Component, Fragment } from "react";
import { DropTarget } from "react-dnd";
import { Link, withRouter } from "react-router-dom";
import ItemForm from "../ItemForm/ItemForm";
import PageBlocker from "../../UI/PageBlocker/PageBlocker";
import { TODOLIST_DRAG_TYPE } from "../../../constants";
import "./FolderThumnail.css";

class FolderThumbnail extends Component {
	state = { openFolderTimeoutID: null };

	componentDidMount() {
		this.setState(prevState => ({ ...prevState }));
	}

	componentDidUpdate() {
		const { openFolderTimeoutID } = this.state;
		const { isOver, canDrop, history, itemId } = this.props;
		const folderPath = `/desktop/${itemId}`;

		if (isOver && !openFolderTimeoutID) {
			this.setState({ openFolderTimeoutID: setTimeout(() => history.push(folderPath), 600) });
		}
		if (openFolderTimeoutID && (!isOver || !canDrop)) {
			clearTimeout(openFolderTimeoutID);
			this.setState({ openFolderTimeoutID: null });
		}
	}

	render() {
		const { connectDropTarget, isOver, name, description, itemId } = this.props;
		const folderPath = `/desktop/${itemId}`;
		const thumbnailClassName = isOver ? "folderThumbnail overFolderThumbnail" : "folderThumbnail";

		return (
			<Fragment>
				{itemId === "untitled" && <PageBlocker />}
				<div ref={connectDropTarget}>
					<Link to={folderPath}>
						<li className="itemThumbnail">
							<div className={thumbnailClassName} title={description}></div>
							{itemId === "untitled" ? <ItemForm createHandler={newFolderName => {}} /> : name}
						</li>
					</Link>
				</div>
			</Fragment>
		);
	}
}

const dropSpecMethod = {
	drop: props => ({ folderId: props.itemId })
};

const collectingFunction = (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop()
});

export default DropTarget(TODOLIST_DRAG_TYPE, dropSpecMethod, collectingFunction)(withRouter(FolderThumbnail));
